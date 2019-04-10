import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text
} from 'react-native';
import localizer from 'utils/Localizer';
import BookFigureComponent from './BookFigureComponent';
import appStyles from 'styles/AppStyles';

function ReadonlyBookComponent(props) {
    const { book } = props;
    if(!book) {
        return null;
    }
    return (
        <View style={[appStyles.resultSingle, appStyles.container, appStyles.vertical]}>
            <BookFigureComponent book={book} size="large"/>
            <Text>{localizer.localize('book-by-label')} {book.authors.join(', ')}</Text>
            <Text>{book.pages} {localizer.localize('book-pages-label')}</Text>
        </View>
    );
}

ReadonlyBookComponent.propTypes = {
    book: PropTypes.shape({
        authors: PropTypes.arrayOf(PropTypes.string).isRequired,
        pages: PropTypes.number.isRequired
    })
};

export default ReadonlyBookComponent;