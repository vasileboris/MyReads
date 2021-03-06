import React from 'react';
import PropTypes from 'prop-types';
import {
    FlatList
} from 'react-native';
import BookComponent from './BookComponent';
import appStyles from 'styles/AppStyles';

function BooksComponent(props) {
    const { books, onBookClick } = props;
    return (
        <FlatList style={[appStyles.resultDetail]}
            data={Object.values(books).sort((book1, book2) => {
                if(book1.date && book2.date && book1.date !== book2.date) {
                    return book2.date.localeCompare(book1.date);
                }

                return book1.title.toLowerCase().localeCompare(book2.title.toLowerCase());
            })}
            keyExtractor={book => book.uuid}
            renderItem={ ({item}) => (
                <BookComponent book={item} onClick={onBookClick}/>
            )}
        />
    );
}

BooksComponent.propTypes = {
    books: PropTypes.object.isRequired,
    onBookClick: PropTypes.func.isRequired
};

export default BooksComponent;
