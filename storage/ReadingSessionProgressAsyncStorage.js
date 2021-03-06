import { buildError } from 'utils/Error';
import {
    addDays,
    getISODate,
    periodDays
} from 'utils/Date';
import { buildResponse } from 'utils/Response';
import { fetchBookFromStore } from './BooksAsyncStorage';
import { fetchCurrentReadingSessionFromStore } from './ReadingSessionAsyncStorage';

export const fetchCurrentReadingSessionProgressFromStore = (bookUuid, uuid) => {
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
                        const averagePagesPerDay = Math.round(lastReadPage / dateReadingSessions.length);
                        const readPercentage = Math.round((lastReadPage * 100) / book.pages);
                        let remainingPages = book.pages - lastReadPage;
                        if(remainingPages > 0 && remainingPages < averagePagesPerDay) {
                            remainingPages = averagePagesPerDay;
                        }
                        const estimatedReadDaysLeft = Math.round(remainingPages / averagePagesPerDay);
                        const readPeriodDays = periodDays(lastReadDate, firstReadDate);
                        const multiplyFactor = Math.round(readPeriodDays / dateReadingSessions.length);
                        const estimatedDaysLeft = estimatedReadDaysLeft * multiplyFactor;
                        const estimatedFinishDate = estimatedDaysLeft > 0 ? addDays(lastReadDate, estimatedDaysLeft) : null;

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

