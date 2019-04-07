import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text
} from 'react-native';
import BookImageComponent from './BookImageComponent';
import appStyles from '/styles/AppStyles';

function BookFigureComponent (props) {
    const { book, size } = props;
    const { text, title, resultImportant, resultDetail } = appStyles;
    return (
        <View>
            <BookImageComponent image={book.image} size={size}/>
            <Text style={[text, title, resultImportant, resultDetail]}>{book.title}</Text>
        </View>
    );
}

BookFigureComponent.propTypes = {
    book: PropTypes.shape({
        image: PropTypes.string,
        title: PropTypes.string.isRequired
    }).isRequired,
    size: PropTypes.string.isRequired
};

export default BookFigureComponent;