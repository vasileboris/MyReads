import { getReason } from 'utils/Error';
import localizer from 'utils/Localizer';
import { fetchCurrentReadingSessionProgressFromStore } from 'storage/ReadingSessionProgressAsyncStorage';

export function fetchReadingSessionProgress(bookUuid) {
    return new Promise((resolve, reject) => {
        fetchCurrentReadingSessionProgressFromStore(bookUuid)
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
