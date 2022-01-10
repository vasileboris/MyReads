import { getReason } from 'utils/Error';
import localizer from 'utils/Localizer';
import {
    fetchCurrentReadingSessionProgressByBookUuidFromStore,
    fetchCurrentReadingSessionProgressByBookFromStore
} from 'storage/ReadingSessionProgressAsyncStorage';

export function fetchReadingSessionProgressByBookUuid(bookUuid) {
    return new Promise((resolve, reject) => {
        fetchCurrentReadingSessionProgressByBookUuidFromStore(bookUuid)
            .then(response => resolve(response))
            .catch(error => reject(fetchReadingSessionProgressMessage(error)))
    });
}

export function fetchReadingSessionProgressByBook(book) {
    return new Promise((resolve, reject) => {
        fetchCurrentReadingSessionProgressByBookFromStore(book)
            .then(response => resolve(response))
            .catch(error => reject(fetchReadingSessionProgressMessage(error)))
    });
}

function fetchReadingSessionProgressMessage(error) {
    const reason = getReason(error);
    switch (reason) {
        case 404:
            return null;
        default:
            return localizer.localize('current-reading-session-retrieve-error');
    }
}
