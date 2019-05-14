import localizer from 'utils/Localizer';
import {
    getReason
} from 'utils/Error';
import {
    fetchCurrentReadingSessionFromStore,
    addCurrentReadingSessionInStore
} from 'storage/ReadingSessionAsyncStorage';

export function fetchCurrentReadingSession(bookUuid) {
    return new Promise((resolve, reject) => {
        fetchCurrentReadingSessionFromStore(bookUuid)
            .then(response => resolve(response))
            .catch(error => {
                if(404 === getReason(error)) {
                    addCurrentReadingSessionInStore(bookUuid)
                        .then(response => resolve(response))
                        .catch(error => reject(fetchCurrentReadingSessionMessage(error)))
                } else {
                    reject(fetchCurrentReadingSessionMessage(error));
                }
            });
    });
}

function fetchCurrentReadingSessionMessage(error) {
    const reason = getReason(error);
    switch (reason) {
        case 404:
            return localizer.localize('current-reading-session-not-found-error');
        default:
            return localizer.localize('current-reading-session-retrieve-error');
    }
}
