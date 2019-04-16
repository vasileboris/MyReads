import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text
} from 'react-native';
import localizer from 'utils/Localizer';
import appStyles from 'styles/AppStyles';
import BookImageComponent from "./BookImageComponent";

function ReadonlyBookComponent(props) {
    const { book } = props;
    if(!book) {
        return null;
    }
    return (
        <View style={[appStyles.result, appStyles.horizontal, appStyles.justifyStart]}>
            <BookImageComponent image={book.image} size="smallRectangle"/>
            <View style={[appStyles.vertical, appStyles.justifyCenter, appStyles.resultText]}>
                <Text style={[appStyles.text, appStyles.title]}>
                    {book.title}
                </Text>
                <View style={[appStyles.vertical, appStyles.justifySpaceBetween]}>
                    <Text style={[appStyles.text]}>
                        {localizer.localize('book-by-label')} {book.authors.join(', ')}
                    </Text>
                    <Text style={[appStyles.text]}>
                        {book.pages} {localizer.localize('book-pages-label')}
                    </Text>
                </View>
            </View>
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
