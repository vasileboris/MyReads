import React from 'react';
import PropTypes from 'prop-types';
import {
    FlatList
} from 'react-native';
import BookComponent from './BookComponent';

function BooksComponent(props) {
    const { books, onBookClick } = props;
    return (
        <FlatList style={[{height: 200}]}
            data={Object.values(books)}
            keyExtractor={book => `${book.isbn10}-${book.isbn13}-${book.title}`}
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
