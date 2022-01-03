import { buildError } from 'utils/Error';
import {
    addDays,
    getISODate,
    periodDays
} from 'utils/Date';
import { buildResponse } from 'utils/Response';
import { fetchBookFromStore } from './BooksAsyncStorage';
import { fetchCurrentReadingSessionFromStore } from './ReadingSessionAsyncStorage';

export const fetchCurrentReadingSessionProgressByBookUuidFromStore = (bookUuid) => {
    return new Promise((resolve, reject) => {
        fetchBookFromStore(bookUuid)
            .then(response => {
                const book = response.data;
                fetchCurrentReadingSessionProgressByBookFromStore(book)
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            })
            .catch(error => {
                reject(error);
            });
    });
};

export const fetchCurrentReadingSessionProgressByBookFromStore = (book) => {
    return new Promise((resolve, reject) => {
        const bookUuid = book.uuid;
        fetchCurrentReadingSessionFromStore(bookUuid)
            .then(response => {
                const readingSession = response.data;

                if (readingSession.dateReadingSessions.length === 0) {
                    reject(buildError(404));
                    return;
                }

                const dateReadingSessions = readingSession.dateReadingSessions;
                dateReadingSessions.sort((drs1, drs2) => drs2.date.localeCompare(drs1.date));
                const firstReadDate = dateReadingSessions[dateReadingSessions.length - 1].date;

                let lastReadDate = dateReadingSessions[0].date;
                const today = getISODate(new Date());
                if (Date.parse(today) > Date.parse(lastReadDate)) {
                    lastReadDate = today;
                }

                let lastReadPage = dateReadingSessions.reduce((lastReadPage, drs) => Math.max(lastReadPage, drs.lastReadPage), dateReadingSessions[0].lastReadPage);
                const lastReadPageDate = dateReadingSessions.find(drs => lastReadPage == drs.lastReadPage);
                lastReadPage = Math.min(lastReadPage, book.pages);

                const averagePagesPerDay = Math.round(lastReadPage / dateReadingSessions.length);
                const readPercentage = Math.round((lastReadPage * 100) / book.pages);
                let remainingPages = book.pages - lastReadPage;
                if (remainingPages > 0 && remainingPages < averagePagesPerDay) {
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
                    lastReadPageDate,
                    bookPages: book.pages,
                    readPercentage,
                    averagePagesPerDay,
                    estimatedReadDaysLeft,
                    estimatedDaysLeft,
                    estimatedFinishDate,
                    deadline: readingSession.deadline,
                    dateReadingSessions,
                };

                resolve(buildResponse(readingSessionProgress));
            })
            .catch(error => {
                reject(error);
            });
    });
}