import { getISODate } from 'utils/Date';

export function getBookDate(book) {
    const bookDate = book.lastReadPageDate ? book.lastReadPageDate : book.updateDate;
    const finalBookDate = bookDate ? bookDate : getISODate(new Date(0)); // 1970-01-01
    return finalBookDate;
}

export function getBookReadPercentage(book) {
    const bookReadPercentage = book.readPercentage ? book.readPercentage : 0;
    return bookReadPercentage;
}
