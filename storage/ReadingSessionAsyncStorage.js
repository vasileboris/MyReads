import {AsyncStorage} from 'react-native';
import uuid from 'uuid';
import { buildResponse } from 'utils/Response';
import { buildError } from 'utils/Error';
import { fetchBookFromStore } from './BooksAsyncStorage';
import {
    addDays,
    getISODate,
    periodDays
} from 'utils/Date';

const READING_SESSIONS_KEY = 'MyReads:ReadingSessions';

export const fetchCurrentReadingSessionFromStore = bookUuid => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(READING_SESSIONS_KEY)
            .then(rawReadingSessions => {
                if(!rawReadingSessions) {
                    rawReadingSessions = '{}';
                }
                const readingSessions = JSON.parse(rawReadingSessions);

                let readingSession = readingSessions[bookUuid];
                if(!readingSession) {
                    reject(buildError(404));
                    return;
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
                    rawReadingSessions = '{}';
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

export const deleteCurrentReadingSessionInStore = bookUuid => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(READING_SESSIONS_KEY)
            .then(rawReadingSessions => {
                if(!rawReadingSessions) {
                    rawReadingSessions = '{}';
                }
                const readingSessions = JSON.parse(rawReadingSessions);

                const readingSession = readingSessions[bookUuid];
                if(!readingSession) {
                    reject(buildError(404));
                    return;
                }
                if(readingSession.dateReadingSessions.length > 0){
                    reject(buildError(403));
                    return;
                }

                delete readingSessions[bookUuid];
                AsyncStorage.setItem(READING_SESSIONS_KEY, JSON.stringify(readingSessions))
                    .then( () => {
                        resolve(buildResponse(readingSession.uuid));
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

export const addDateReadingSessionInStore = (bookUuid, uuid, dateReadingSession) => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(READING_SESSIONS_KEY)
            .then(rawReadingSessions => {
                const readingSessions = JSON.parse(rawReadingSessions);
                let readingSession = readingSessions[bookUuid];
                if(!readingSession) {
                    reject(buildError(404));
                    return;
                }

                const existingDateReadingSession = readingSession.dateReadingSessions.find(drs => dateReadingSession.date === drs.date);
                if(existingDateReadingSession) {
                    reject(buildError(403));
                    return;
                }

                readingSession.dateReadingSessions.push(dateReadingSession);
                readingSession.dateReadingSessions.sort((drs1, drs2) => drs2.date.localeCompare(drs1.date));

                AsyncStorage.setItem(READING_SESSIONS_KEY, JSON.stringify(readingSessions))
                    .then( () => {
                        resolve(buildResponse(dateReadingSession));
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

export const updateDateReadingSessionInStore = (bookUuid, uuid, dateReadingSession) => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(READING_SESSIONS_KEY)
            .then(rawReadingSessions => {
                const readingSessions = JSON.parse(rawReadingSessions);
                let readingSession = readingSessions[bookUuid];
                if(!readingSession) {
                    reject(buildError(404));
                    return;
                }

                const existingDateReadingSession = readingSession.dateReadingSessions.find(drs => dateReadingSession.date === drs.date);
                if(!existingDateReadingSession) {
                    reject(buildError(404));
                    return;
                }

                existingDateReadingSession.lastReadPage = dateReadingSession.lastReadPage;
                existingDateReadingSession.bookmark = dateReadingSession.bookmark;
                readingSession.dateReadingSessions.sort((drs1, drs2) => drs2.date.localeCompare(drs1.date));

                AsyncStorage.setItem(READING_SESSIONS_KEY, JSON.stringify(readingSessions))
                    .then( () => {
                        resolve(buildResponse(dateReadingSession.date));
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

export const deleteDateReadingSessionInStore = (bookUuid, uuid, date) => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(READING_SESSIONS_KEY)
            .then(rawReadingSessions => {
                const readingSessions = JSON.parse(rawReadingSessions);
                let readingSession = readingSessions[bookUuid];
                if(!readingSession) {
                    reject(buildError(404));
                    return;
                }

                const newDateReadingSessions = readingSession.dateReadingSessions.filter(drs => date !== drs.date);
                if(newDateReadingSessions.length === readingSession.dateReadingSessions.length) {
                    reject(buildError(404));
                    return;
                }

                readingSession.dateReadingSessions = newDateReadingSessions;
                readingSession.dateReadingSessions.sort((drs1, drs2) => drs2.date.localeCompare(drs1.date));

                AsyncStorage.setItem(READING_SESSIONS_KEY, JSON.stringify(readingSessions))
                    .then( () => {
                        resolve(buildResponse(date));
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

export const    fetchCurrentReadingSessionProgressFromStore = (bookUuid, uuid) => {
    return new Promise((resolve, reject) => {
        fetchBookFromStore(bookUuid)
            .then(response => {
                const book = response.data;
                fetchCurrentReadingSessionFromStore(bookUuid)
                    .then(response => {
                        const readingSession = response.data;

                        if(readingSession.dateReadingSessions.length === 0) {
                            reject(buildError(404));
                            return;
                        }

                        const dateReadingSessions = readingSession.dateReadingSessions;
                        dateReadingSessions.sort((drs1, drs2) => drs2.date.localeCompare(drs1.date));
                        const firstReadDate = dateReadingSessions[dateReadingSessions.length -1].date;

                        let lastReadDate = dateReadingSessions[0].date;
                        const today = getISODate(new Date());
                        if(Date.parse(today) > Date.parse(lastReadDate)) {
                           lastReadDate = today;
                        }
                        const lastReadPage = dateReadingSessions.reduce((lastReadPage, drs) => Math.max(lastReadPage, drs.lastReadPage), dateReadingSessions[0].lastReadPage);
                        const averagePagesPerDay = Math.ceil(lastReadPage / dateReadingSessions.length);
                        const readPercentage = Math.ceil((lastReadPage * 100) / book.pages);
                        let remainingPages = book.pages = lastReadPage;
                        if(remainingPages > 0 && remainingPages < averagePagesPerDay) {
                            remainingPages = averagePagesPerDay;
                        }
                        const estimatedReadDaysLeft = Math.ceil(remainingPages / averagePagesPerDay);
                        const readPeriodDays = periodDays(lastReadDate, firstReadDate);
                        const multiplyFactor = Math.ceil(readPeriodDays / dateReadingSessions.length);
                        const estimatedDaysLeft = estimatedReadDaysLeft * multiplyFactor;
                        const estimatedFinishDate = estimatedReadDaysLeft > 0 ? addDays(lastReadDate, estimatedReadDaysLeft) : null;

                        const readingSessionProgress = {
                            bookUuid,
                            lastReadPage,
                            pagesTotal: book.pages,
                            readPercentage,
                            averagePagesPerDay,
                            estimatedReadDaysLeft,
                            estimatedDaysLeft,
                            estimatedFinishDate,
                            deadline: readingSession.deadline
                        };

                        resolve(buildResponse(readingSessionProgress));
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

