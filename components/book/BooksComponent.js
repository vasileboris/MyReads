import React from 'react';
import PropTypes from 'prop-types';
import {
    FlatList
} from 'react-native';
import BookComponent from './BookComponent';

function BooksComponent(props) {
    const { books } = props;
    return (
        <FlatList style={[{height: 200}]}
            data={Object.values(books)}
            keyExtractor={book => `${book.isbn10}-${book.isbn13}-${book.title}`}
            renderItem={ ({item}) => (
                <BookComponent book={item}/>
            )}
        />
    );
}

BooksComponent.propTypes = {
    books: PropTypes.object
};

export default BooksComponent;
