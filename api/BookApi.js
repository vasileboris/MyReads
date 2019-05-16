import localizer from 'utils/Localizer';
import {
    getReason
} from 'utils/Error';
import {
    sanitize,
    sanitizeArray,
    sanitizeNumber
} from 'validation/Sanitizer';
import {
    isPositiveNumber,
    isRequired
} from 'validation/Rule';
import validate from 'validation/Validator';
import {
    fetchBookFromStore,
    fetchBooksFromStore,
    addBookInStore,
    updateBookInStore,
    deleteBookFromStore
} from 'storage/BooksAsyncStorage';

export function fetchBook(uuid) {
    return new Promise((resolve, reject) => {
        fetchBookFromStore(uuid)
            .then(response => resolve(response))
            .catch(error => reject(fetchBookErrorMessage(error)))
    });
}

export function fetchBooks(searchText) {
    return new Promise((resolve, reject) => {
        fetchBooksFromStore(searchText)
            .then(response => resolve(response))
            .catch(error => reject(fetchBooksErrorMessage(error)))
    });
}

export function deleteBook(uuid) {
    return new Promise((resolve, reject) => {
        deleteBookFromStore(uuid)
            .then(response => resolve(response))
            .catch(error => reject(deleteBookErrorMessage(error)))
    });
}

export function addBook(book) {
    return new Promise((resolve, reject) => {
        addBookInStore(book)
            .then(response => resolve(response))
            .catch(error => reject(addBookErrorMessage(error)))
    });
}

export function updateBook(book) {
    return new Promise((resolve, reject) => {
        updateBookInStore(book)
            .then(response => resolve(response))
            .catch(error => reject(updateBookErrorMessage(error)))
    });
}

export function validateBook(book) {
    return new Promise((resolve, reject) => {
        let message = validate(book.title, [isRequired]);
        if(message) {
            reject(localizer.localize(message, localizer.localize('book-title-text')));
            return;
        }

        message = validate(book.authors, [isRequired]);
        if(message) {
            reject(localizer.localize(message, localizer.localize('book-authors-text')));
            return;
        }

        message = validate(book.pages, [isRequired, isPositiveNumber]);
        if(message) {
            reject(localizer.localize(message, localizer.localize('book-pages-text')));
            return;
        }

        resolve();
    });
}

export function sanitizeBook(book) {
    const { isbn10, isbn13, title, authors, image, pages } = book;
    return {
        ...book,
        isbn10: sanitize(isbn10),
        isbn13: sanitize(isbn13),
        title: sanitize(title),
        authors: sanitizeArray(authors),
        image: sanitize(image),
        pages: sanitizeNumber(pages)
    };
}

function fetchBookErrorMessage(error) {
    const reason = getReason(error);
    switch (reason) {
        case 404:
            return localizer.localize('book-not-found-error');
        default:
            return localizer.localize('book-retrieve-error');
    }
}

function fetchBooksErrorMessage() {
    return localizer.localize('books-search-error');
}

function addBookErrorMessage(error) {
    const reason = getReason(error);
    switch (reason) {
        case 403:
            return localizer.localize('book-isbn-already-exists-error');
        default:
            return localizer.localize('book-save-error');
    }
}

function updateBookErrorMessage(error) {
    const reason = getReason(error);
    switch (reason) {
        case 403:
            return localizer.localize('book-isbn-already-exists-error');
        case 404:
            return localizer.localize('book-not-found-error');
        default:
            return localizer.localize('book-save-error');
    }
}

function deleteBookErrorMessage(error) {
    const reason = getReason(error);
    switch (reason) {
        case 403:
            return localizer.localize('book-has-reading-session-error');
        case 404:
            return localizer.localize('book-not-found-error');
        default:
            return localizer.localize('book-delete-error');
    }
}
