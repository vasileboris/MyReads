import React from 'react';
import BookImageComponent from './BookImageComponent';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import appStyles from '/styles/AppStyles';
import appTheme from "../../styles/AppTheme";

const styles = StyleSheet.create({
    text: {
        color: appTheme.color3
    },
});

function BookFigureComponent (props) {
    const { book, size } = props;
    return (
        <View>
            <BookImageComponent image={book.image} size={size}/>
            <Text style={[appStyles.text, styles.text]}>{book.title}</Text>
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