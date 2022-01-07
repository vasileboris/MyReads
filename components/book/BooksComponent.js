import React from 'react';
import PropTypes from 'prop-types';
import {
    FlatList
} from 'react-native';
import BookComponent from './BookComponent';
import Card from '/components/card/Card';
import appStyles from 'styles/AppStyles';
import { getISODate } from 'utils/Date';

function BooksComponent(props) {
    const { books, onBookClick } = props;
    return (
        <FlatList style={[appStyles.resultDetail]}
            data={Object.values(books).sort((book1, book2) => {
                // Unread books first
                if((book1.readPercentage === 100 && book2.readPercentage < 100)
                    || (book1.readPercentage < 100 && book2.readPercentage === 100)) {
                    return book1.readPercentage - book2.readPercentage;
                }

                // and then sort by date desc
                const book1Date = getBookDate(book1);
                const book2Date = getBookDate(book2);
                if(book1Date !== book2Date) {
                    return book2Date.localeCompare(book1Date);
                }

                // and then by title asc
                return book1.title.toLowerCase().localeCompare(book2.title.toLowerCase());
            })}
            keyExtractor={book => book.uuid}
            renderItem={ ({item}) => (
                <Card style={[appStyles.marginTop]}>
                    <BookComponent book={item} onClick={onBookClick}/>
                </Card>
            )}
        />
    );
}

function getBookDate(book) {
    const bookDate = book.lastReadPageDate ? book.lastReadPageDate : book.lastReadPageDate;
    return bookDate ? bookDate :  getISODate(new Date(0)); // 1970-01-01
}

BooksComponent.propTypes = {
    books: PropTypes.object.isRequired,
    onBookClick: PropTypes.func.isRequired
};

export default BooksComponent;
