import {
    call,
    put,
    takeLatest
} from 'redux-saga/effects';
import {
    fetchBook,
    fetchBooks,
    deleteBook,
    sanitizeBook,
    validateBook,
    addBook,
    updateBook
} from 'api/BookApi';
import { fetchReadingSessionProgressByBook } from 'api/ReadingSessionProgressApi';
import {
    receiveBookAction,
    receiveBooksAction,
    resetBookAction,
    FETCH_BOOK,
    FETCH_BOOKS,
    DELETE_BOOK,
    ADD_BOOK,
    UPDATE_BOOK,
    UPDATE_BOOKS_STATS
} from 'actions/BookAction';
import { receiveMessageAction } from 'actions/MessageAction';
import { receiveBooksSearchTextAction } from 'actions/BooksSearchAction';
import { changeBookOperationAction } from 'actions/OperationAction';
import { fetchCurrentReadingSessionAction } from 'actions/ReadingSessionAction';

//Needed for Uncaught ReferenceError: regeneratorRuntime is not defined
import 'babel-polyfill';
import { getISODate } from 'utils/Date';

export function* watchFetchBook() {
    yield takeLatest(FETCH_BOOK, callFetchBook);
}

export function* watchFetchBooks() {
    yield takeLatest(FETCH_BOOKS, callFetchBooks);
}

export function* watchUpdateBooksStats() {
    yield takeLatest(UPDATE_BOOKS_STATS, callUpdateBooksStats);
}

export function* watchDeleteBook() {
    yield takeLatest(DELETE_BOOK, callDeleteBook);
}

export function* watchAddBook() {
    yield takeLatest(ADD_BOOK, callAddBook);
}

export function* watchUpdateBook() {
    yield takeLatest(UPDATE_BOOK, callUpdateBook);
}

function* callFetchBook(action) {
    try {
        const bookUuid = action.payload;
        const response = yield call(fetchBook, bookUuid);
        yield put(receiveBookAction(response.data));
    } catch(error) {
        yield put(receiveMessageAction(error));
    }
}

function* callFetchBooks(action) {
    try {
        yield put(receiveMessageAction(null));
        const searchText = action.payload;
        const response = yield call(fetchBooks, searchText);
        yield put(receiveBooksAction(response.data));
    } catch(error) {
        yield put(receiveMessageAction(error));
    }
}

function* callUpdateBooksStats() {
    try {
        yield put(receiveMessageAction(null));
        const searchText = null; // Retrieve all books
        const booksResponse = yield call(fetchBooks, searchText);
        const books = booksResponse.data;
        for(let i=0; i<books.length; i++) {
            const book = books[i];
            if(undefined === book.updateDate
                || undefined === book.readPercentage
                || undefined === book.lastReadPageDate) {

                try {
                    const readingSessionProgressResponse = yield call(fetchReadingSessionProgressByBook, book);
                    const readingSessionProgress = readingSessionProgressResponse.data;
                    const updatedBook = {
                        ...book,
                        updateDate: getISODate(new Date()),
                        readPercentage: readingSessionProgress.readPercentage,
                        lastReadPageDate: readingSessionProgress.lastReadPageDate
                    }
                    yield call(updateBook, updatedBook);
                } catch (error) {
                    if(!error) {
                        const updatedBook = {
                            ...book,
                            updateDate: getISODate(new Date()),
                            readPercentage: null,
                            lastReadPageDate: null
                        }
                        yield call(updateBook, updatedBook);
                    }
                }
            }
        }
    } catch(error) {
        yield put(receiveMessageAction(error));
    }
}

function* callDeleteBook(action) {
    try {
        yield put(receiveMessageAction(null));
        const bookUuid = action.payload.uuid;
        yield call(deleteBook, bookUuid);
        yield dispatchBookSearchData(action);
    } catch(error) {
        yield put(receiveMessageAction(error));
    }
}

function* callAddBook(action) {
    try {
        yield put(receiveMessageAction(null));
        const book = sanitizeBook(action.payload.book);
        yield put(resetBookAction(book));
        yield call(validateBook, book);
        const response = yield call(addBook, book);
        yield put(resetBookAction(response.data));
        yield dispatchBookSearchData(action);
    } catch(error) {
        yield put(receiveMessageAction(error));
    }
}

function* callUpdateBook(action) {
    try {
        yield put(receiveMessageAction(null));
        const book = sanitizeBook(action.payload.book);
        yield put(resetBookAction(book));
        yield call(validateBook, book);
        yield call(updateBook, book);
        yield put(fetchCurrentReadingSessionAction(book.uuid));
        yield dispatchBookSearchData(action);
    } catch(error) {
        yield put(receiveMessageAction(error));
    }
}

function* dispatchBookSearchData(action) {
    try {
        const searchText = action.payload.searchText;
        yield put(receiveMessageAction(null));
        yield put(changeBookOperationAction('view'));
        yield put(receiveBooksSearchTextAction(searchText));
        const response = yield call(fetchBooks, searchText);
        yield put(receiveBooksAction(response.data));
    } catch(error) {
        yield put(receiveMessageAction(error));
    }
}
