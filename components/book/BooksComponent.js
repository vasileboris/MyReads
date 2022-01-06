import React from 'react';
import PropTypes from 'prop-types';
import {
    FlatList
} from 'react-native';
import BookComponent from './BookComponent';
import Card from '/components/card/Card';
import appStyles from 'styles/AppStyles';

function BooksComponent(props) {
    const { books, onBookClick } = props;
    return (
        <FlatList style={[appStyles.resultDetail]}
            data={Object.values(books).sort((book1, book2) => {
                if(book1.updateDate && book2.updateDate && book1.updateDate !== book2.updateDate) {
                    return book2.updateDate.localeCompare(book1.updateDate);
                }

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
