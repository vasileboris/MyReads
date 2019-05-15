import localizer from 'utils/Localizer';
import {
    getReason
} from 'utils/Error';
import {
    sanitize,
    sanitizeNumber
} from 'validation/Sanitizer';
import {
    isDate,
    isPositiveNumber,
    isRequired
} from 'validation/Rule';
import validate from 'validation/Validator';
import {
    addDateReadingSessionInStore,
    updateDateReadingSessionInStore,
    deleteDateReadingSessionInStore
} from 'storage/ReadingSessionAsyncStorage';

export function createDateReadingSession(bookUuid, uuid, dateReadingSession) {
    return new Promise((resolve, reject) => {
        addDateReadingSessionInStore(bookUuid, uuid, dateReadingSession)
            .then(response => resolve(response))
            .catch(error => reject(createDateReadingSessionErrorMessage(error)))
    });
}

export function updateDateReadingSession(bookUuid, uuid, dateReadingSession) {
    return new Promise((resolve, reject) => {
        updateDateReadingSessionInStore(bookUuid, uuid, dateReadingSession)
            .then(response => resolve(response))
            .catch(error => reject(updateDateReadingSessionErrorMessage(error)))
    });
}

export function deleteDateReadingSession(bookUuid, uuid, date) {
    return new Promise((resolve, reject) => {
        deleteDateReadingSessionInStore(bookUuid, uuid, date)
            .then(response => resolve(response))
            .catch(error => reject(deleteDateReadingSessionErrorMessage(error)))
    });
}

export function validateDateReadingSession(dateReadingSession) {
    return new Promise((resolve, reject) => {
        let message = validate(dateReadingSession.date, [isRequired, isDate]);
        if(message) {
            reject(localizer.localize(message, localizer.localize('date-reading-session-date-text')));
            return;
        }

        message = validate(dateReadingSession.lastReadPage, [isRequired, isPositiveNumber]);
        if(message) {
            reject(localizer.localize(message, localizer.localize('date-reading-session-last-read-page-text')));
            return;
        }

        resolve();
    });
}

export function sanitizeDateReadingSession(dateReadingSession) {
    const { date, lastReadPage, bookmark } = dateReadingSession;
    return {
        ...dateReadingSession,
        date: sanitize(date),
        lastReadPage: sanitizeNumber(lastReadPage),
        bookmark: sanitize(bookmark)
    };
}

function createDateReadingSessionErrorMessage(error) {
    const reason = getReason(error);
    switch (reason) {
        case 403:
            return localizer.localize('date-reading-session-already-exists-error');
        case 404:
            return localizer.localize('current-reading-session-not-found-error');
        default:
            return localizer.localize('date-reading-session-save-error');
    }
}

function updateDateReadingSessionErrorMessage(error) {
    const reason = getReason(error);
    switch (reason) {
        case 404:
            return localizer.localize('current-reading-session-not-found-error');
        default:
            return localizer.localize('date-reading-session-save-error');
    }
}

function deleteDateReadingSessionErrorMessage(error) {
    const reason = getReason(error);
    switch (reason) {
        case 404:
            return localizer.localize('current-reading-session-not-found-error');
        default:
            return localizer.localize('date-reading-session-delete-error');
    }
}
