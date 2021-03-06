import {AsyncStorage} from 'react-native';
import uuid from 'uuid';
import { isString } from 'utils/TypeCheck';
import {
    buildError,
    getReason
} from 'utils/Error';
import { buildResponse } from 'utils/Response';
import {
    fetchCurrentReadingSessionFromStore,
    deleteCurrentReadingSessionInStore
} from './ReadingSessionAsyncStorage';

const BOOKS_KEY = 'MyReads:Books';

export const fetchBooksFromStore = searchText => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(BOOKS_KEY)
            .then(rawBooks => {
                if(!rawBooks) {
                    resolve(buildResponse([]));
                    return;
                }
                const books = JSON.parse(rawBooks);

                let filteredBooks = books;
                if(searchText && isString(searchText)) {
                    const sanitizedSearchText = searchText.trim().toLowerCase();
                    filteredBooks = Object.values(books)
                        .filter(book =>
                            (book.title && book.title.toLowerCase().includes(sanitizedSearchText))
                            || (book.authors && book.authors.join(',').toLowerCase().includes(sanitizedSearchText))
                        )
                        .reduce((result, book) => ({...result, [book.uuid]: book}), {})
                }
                resolve(buildResponse(Object.values(filteredBooks)));
            })
            .catch(error => {
                reject(error);
            });
    });
};

export const fetchBookFromStore = uuid => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(BOOKS_KEY)
            .then(rawBooks => {
                if(!rawBooks) {
                    rawBooks = '{}';
                }
                const books = JSON.parse(rawBooks);

                if(!books[uuid]) {
                    reject(buildError(404));
                    return;
                }

                resolve(buildResponse(books[uuid]));
            })
            .catch(error => {
                reject(error);
            });
    });
};

export const addBookInStore = book => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(BOOKS_KEY)
            .then(rawBooks => {
                if(!rawBooks) {
                    rawBooks = '{}';
                }
                const books = JSON.parse(rawBooks);

                const savedBook = {...book};
                savedBook.uuid = uuid.v1();
                books[savedBook.uuid] = savedBook;
                AsyncStorage.setItem(BOOKS_KEY, JSON.stringify(books))
                    .then( () => {
                        resolve(buildResponse(savedBook));
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
            .catch(error => {
                reject(error);
            });
    });
};

export const updateBookInStore = book => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(BOOKS_KEY)
            .then(rawBooks => {
                const books = JSON.parse(rawBooks);

                if(!books[book.uuid]) {
                    reject(buildError(404));
                    return;
                }

                books[book.uuid] = book;
                AsyncStorage.setItem(BOOKS_KEY, JSON.stringify(books))
                    .then( () => {
                        resolve();
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
            .catch(error => {
                reject(error);
            });
    });
};

const safeDeleteBookFromStore = (books, uuid, resolve, reject) => {
    delete books[uuid];
    AsyncStorage.setItem(BOOKS_KEY, JSON.stringify(books))
        .then(() => {
            resolve();
        })
        .catch(error => {
            reject(error);
        });
};

export const deleteBookFromStore = uuid => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(BOOKS_KEY)
            .then(rawBooks => {
                const books = JSON.parse(rawBooks);

                if(!books[uuid]) {
                    reject(buildError(404));
                    return;
                }

                fetchCurrentReadingSessionFromStore(uuid)
                    .then(() => {
                        deleteCurrentReadingSessionInStore(uuid)
                            .then(() => {
                                safeDeleteBookFromStore(books, uuid, resolve, reject);
                            })
                            .catch(error => {
                                reject(error);
                            });
                    })
                    .catch(error => {
                        if(404 === getReason(error)) {
                            safeDeleteBookFromStore(books, uuid, resolve, reject);
                        } else {
                            reject(buildError(500));
                        }
                    });
            })
            .catch(error => {
                reject(error);
            });
    });
};
