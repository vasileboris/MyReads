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

export function sortBooks(book1, book2) {
    // Unread books first
    const book1ReadPercentage = getBookReadPercentage(book1);
    const book2ReadPercentage = getBookReadPercentage(book2);
    if((book1ReadPercentage === 100 && book2ReadPercentage < 100)
        || (book1ReadPercentage < 100 && book2ReadPercentage === 100)) {
        return book1ReadPercentage - book2ReadPercentage;
    }

    // and then sort by date desc
    const book1Date = getBookDate(book1);
    const book2Date = getBookDate(book2);
    if(book1Date !== book2Date) {
        return book2Date.localeCompare(book1Date);
    }

    // and then by title asc
    return book1.title.toLowerCase().localeCompare(book2.title.toLowerCase());
}