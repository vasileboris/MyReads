import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchReadingSessionProgressByBookUuid } from 'api/ReadingSessionProgressApi';
import {
    receiveReadingSessionProgressAction,
    clearReadingSessionProgressAction,
    FETCH_READING_SESSION_PROGRESS } from 'actions/ReadingSessionProgressAction';
import { receiveMessageAction } from 'actions/MessageAction';
import {
    fetchBook,
    updateBook
} from 'api/BookApi';
import {
    receiveBookAction,
    resetBookAction} from 'actions/BookAction';
import { getISODate } from 'utils/Date';

export function* watchFetchReadingSessionProgress() {
    yield takeLatest(FETCH_READING_SESSION_PROGRESS, callFetchReadingSessionProgress);
}

function* callFetchReadingSessionProgress(action) {
    const { bookUuid } = action.payload;
    let bookResponse = null;
    try {
        bookResponse = yield call(fetchBook, bookUuid);
        const response = yield call(fetchReadingSessionProgressByBookUuid, bookUuid);

        const book = {
            ...bookResponse.data,
            updateDate: getISODate(new Date()),
            readPercentage: response.data.readPercentage,
            lastReadPageDate: response.data.lastReadPageDate
        }
        yield call(updateBook, book);
        yield put(receiveBookAction(book));
        yield put(resetBookAction(book));

        yield put(receiveReadingSessionProgressAction(response.data));
    } catch (error) {
        yield put(receiveMessageAction(error));
        if(!error && bookResponse) {
            const book = {
                ...bookResponse.data,
                updateDate: getISODate(new Date()),
                readPercentage: null,
                lastReadPageDate: null
            }
            yield call(updateBook, book);
            yield put(receiveBookAction(book));
        }
        yield put(clearReadingSessionProgressAction(bookUuid));
    }
}
