import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    TouchableOpacity
} from 'react-native';
import appStyles from 'styles/AppStyles';
import BookImageComponent from "./BookImageComponent";
import BookDetailsComponent from './BookDetailsComponent';

function BookComponent(props) {
    const { book, onClick } = props;
    return (
        <TouchableOpacity onPress={() => onClick(book)}>
            <View style={[appStyles.result, appStyles.horizontal, appStyles.justifyStart, appStyles.alignItemsCenter]}>
                <BookImageComponent image={book.image} size="smallRectangle"/>
                <View style={[appStyles.resultDetailsSection]}>
                    <BookDetailsComponent book={book}/>
                </View>
            </View>
        </TouchableOpacity>
    );
}

BookComponent.propTypes = {
    book: PropTypes.shape({
        authors: PropTypes.arrayOf(PropTypes.string).isRequired,
        pages: PropTypes.number.isRequired
    }).isRequired,
    onClick: PropTypes.func.isRequired
};

export default BookComponent;
