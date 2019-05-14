import {AsyncStorage} from 'react-native';
import uuid from 'uuid';
import { buildResponse } from 'utils/Response';
import { buildError } from 'utils/Error';

const READING_SESSIONS_KEY = 'MyReads:ReadingSessions';

export const fetchCurrentReadingSessionFromStore = bookUuid => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(READING_SESSIONS_KEY)
            .then(rawReadingSessions => {
                if(!rawReadingSessions) {
                    rawReadingSessions = "{}";
                }
                const readingSessions = JSON.parse(rawReadingSessions);
                let readingSession = readingSessions[bookUuid];
                if(!readingSession) {
                    reject(buildError(404));
                }
                resolve(buildResponse(readingSession));
            })
            .catch(error => {
                reject(error);
            });
    });
};

export const addCurrentReadingSessionInStore = bookUuid => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(READING_SESSIONS_KEY)
            .then(rawReadingSessions => {
                if(!rawReadingSessions) {
                    rawReadingSessions = "{}";
                }
                const readingSessions = JSON.parse(rawReadingSessions);
                const readingSession = {
                    uuid: uuid.v1(),
                    bookUuid,
                    dateReadingSessions: []
                };
                readingSessions[bookUuid] = readingSession;
                AsyncStorage.setItem(READING_SESSIONS_KEY, JSON.stringify(readingSessions))
                    .then( () => {
                        resolve(buildResponse(readingSession));
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
