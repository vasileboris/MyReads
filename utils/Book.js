import { getISODate } from 'utils/Date';

export function getBookDate(book) {
    const bookDate = book.lastReadPageDate ? book.lastReadPageDate : book.lastReadPageDate;
    return bookDate ? bookDate :  getISODate(new Date(0)); // 1970-01-01
}
