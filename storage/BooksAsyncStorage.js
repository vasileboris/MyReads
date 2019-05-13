import {AsyncStorage} from 'react-native';
import uuid from 'uuid';
import { isString } from 'utils/TypeCheck';
const BOOKS_KEY = 'MyReads:Books';

export const fetchBooksFromStore = searchText => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(BOOKS_KEY)
            .then(rawBooks => {
                if(!rawBooks) {
                    resolve({ data: [] });
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
                resolve({ data: Object.values(filteredBooks) });
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
                    rawBooks = "{}";
                }
                const books = JSON.parse(rawBooks);
                if(!books[uuid]) {
                    reject({error: {status: 404}});
                }
                resolve({ data: books[uuid] });
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
                    rawBooks = "{}";
                }
                const savedBook = {...book};
                savedBook.uuid = uuid.v1();
                const books = JSON.parse(rawBooks);
                books[savedBook.uuid] = savedBook;
                AsyncStorage.setItem(BOOKS_KEY, JSON.stringify(books))
                    .then( () => {
                        resolve({ data: savedBook });
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
                if(!rawBooks) {
                    rawBooks = "{}";
                }
                const books = JSON.parse(rawBooks);
                if(!books[book.uuid]) {
                    reject({error: {status: 404}});
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

export const deleteBookFromStore = uuid => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(BOOKS_KEY)
            .then(rawBooks => {
                if(!rawBooks) {
                    rawBooks = "{}";
                }
                const books = JSON.parse(rawBooks);
                if(!books[uuid]) {
                    reject({error: {status: 404}});
                }
                delete books[uuid];
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
