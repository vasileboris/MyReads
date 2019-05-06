import React from 'react';
import PropTypes from 'prop-types';
import {
    FlatList
} from 'react-native';
import BookComponent from './BookComponent';
import appStyles from "styles/AppStyles";

function BooksComponent(props) {
    const { books, onBookClick } = props;
    return (
        <FlatList style={[appStyles.resultDetail]}
            data={Object.values(books).sort((book1, book2) => book1.title.localeCompare(book2.title))}
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
