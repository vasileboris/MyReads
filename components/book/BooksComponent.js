import React from 'react';
import PropTypes from 'prop-types';
import {
    FlatList
} from 'react-native';
import BookComponent from './BookComponent';
import Card from '/components/card/Card';
import appStyles from 'styles/AppStyles';
import {
    getBookDate,
    getBookReadPercentage } from 'utils/Book';

function BooksComponent(props) {
    const { books, onBookClick } = props;
    return (
        <FlatList style={[appStyles.resultDetail]}
            data={Object.values(books).sort((book1, book2) => {
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

BooksComponent.propTypes = {
    books: PropTypes.object.isRequired,
    onBookClick: PropTypes.func.isRequired
};

export default BooksComponent;
