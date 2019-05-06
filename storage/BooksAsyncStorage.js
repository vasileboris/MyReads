import {AsyncStorage} from 'react-native';
import uuid from 'react-native-uuid';

const BOOKS_KEY = 'MyReads:Books';

//TODO - Implement search
export const fetchBooksFromStore = searchText => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(BOOKS_KEY)
            .then(rawBooks => {
                if(!rawBooks) {
                    resolve({ data: [] });
                }
                const books = JSON.parse(rawBooks);
                resolve({ data: Object.values(books) });
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
