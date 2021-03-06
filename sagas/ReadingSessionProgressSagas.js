import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchReadingSessionProgress } from 'api/ReadingSessionProgressApi';
import {
    receiveReadingSessionProgressAction,
    clearReadingSessionProgressAction,
    FETCH_READING_SESSION_PROGRESS } from 'actions/ReadingSessionProgressAction';
import { receiveMessageAction } from 'actions/MessageAction';
import {
    fetchBook,
    updateBook
} from 'api/BookApi';
import { receiveBookAction } from 'actions/BookAction';
import { getISODate } from 'utils/Date';

export function* watchFetchReadingSessionProgress() {
    yield takeLatest(FETCH_READING_SESSION_PROGRESS, callFetchReadingSessionProgress);
}

function* callFetchReadingSessionProgress(action) {
    const { bookUuid, uuid } = action.payload;
    try {
        const bookResponse = yield call(fetchBook, bookUuid);
        const response = yield call(fetchReadingSessionProgress, bookUuid, uuid);

        if(bookResponse.data.readPercentage !== response.data.readPercentage) {
                const book = {
                ...bookResponse.data,
                readPercentage: response.data.readPercentage,
                date: getISODate(new Date())
            }
            yield call(updateBook, book);
            yield put(receiveBookAction(book));
        }

        yield put(receiveReadingSessionProgressAction(response.data));
    } catch (error) {
        yield put(receiveMessageAction(error));
        yield put(clearReadingSessionProgressAction(bookUuid));
    }
}
