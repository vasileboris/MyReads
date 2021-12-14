import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchCurrentReadingSession } from 'api/ReadingSessionApi';
import {
    receiveCurrentReadingSessionAction,
    FETCH_CURRENT_READING_SESSION } from 'actions/ReadingSessionAction';
import { fetchReadingSessionProgressAction } from 'actions/ReadingSessionProgressAction';
import { receiveMessageAction } from 'actions/MessageAction';

export function* watchFetchCurrentReadingSession() {
    yield takeLatest(FETCH_CURRENT_READING_SESSION, callFetchCurrentReadingSession);
}

function* callFetchCurrentReadingSession(action) {
    try {
        const bookUuid  = action.payload;
        const response = yield call(fetchCurrentReadingSession, bookUuid);
        yield put(receiveCurrentReadingSessionAction(response.data));
        yield put(fetchReadingSessionProgressAction(bookUuid));
    } catch (error) {
        yield put(receiveMessageAction(error));
    }
}