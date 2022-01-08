import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import appStyles from 'styles/AppStyles';
import BookImageComponent from './BookImageComponent';
import BookDetailsComponent from './BookDetailsComponent';

function BookStatsComponent(props) {
    const { book } = props;
    return (
        <View style={[appStyles.result, appStyles.horizontal, appStyles.justifyStart, appStyles.alignItemsCenter]}>
            <BookImageComponent image={book.image} size="smallRectangle"/>
            <View style={[appStyles.resultDetailsSection]}>
                <BookDetailsComponent book={book}/>
            </View>
        </View>
    );
}

BookStatsComponent.propTypes = {
    book: PropTypes.shape({
        authors: PropTypes.arrayOf(PropTypes.string).isRequired,
        pages: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired
    }).isRequired
};

export default BookStatsComponent;
