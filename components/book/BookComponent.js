import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text
} from 'react-native';
import localizer from 'utils/Localizer';
import BookImageComponent from './BookImageComponent';
import Button from 'components/button/Button';
import Image from 'components/image/Image';
import appStyles from 'styles/AppStyles';
import appColors from 'styles/AppColors';

function BookComponent(props) {
    const { book, onReadClick, onEditClick, onDeleteClick } = props;
    const openBook = require('../../assets/images/open-book.png');
    return (
        <View style={[appStyles.resultSingle, appStyles.vertical, appStyles.justifySpaceBetween]}>
            <View style={[appStyles.resultSingleSectionB1, appStyles.horizontal, appStyles.justifyStart, appStyles.alignItemsCenter]}>
                <Image image={{source: openBook}} size="large"/>
                <View style={[appStyles.vertical, appStyles.justifyCenter, appStyles.resultSingleSectionA2]}>
                    <Text style={[appStyles.text, appStyles.title]}>
                        {book.title}
                    </Text>
                    <Text style={[appStyles.text]}>
                        {localizer.localize('book-by-label')} {book.authors.join(', ')}
                    </Text>
                    <Text style={[appStyles.text]}>
                        {book.pages} {localizer.localize('book-pages-label')}
                    </Text>
                </View>
            </View>
            <View style={[appStyles.resultDetail, appStyles.resultSingleSectionA1, appStyles.vertical, appStyles.justifySpaceBetween]}>
                <Button style={[appStyles.button]}
                        color={appColors.color3}
                        onPress={() => onReadClick(book)}
                        title={localizer.localize('read-button')}/>
                <View style={[appStyles.horizontal, appStyles.justifyStart, appStyles.alignItemsCenter]}>
                    <BookImageComponent image={book.image} size="large"/>
                    <View style={[appStyles.vertical, appStyles.justifyCenter, appStyles.resultSingleSectionA2]}>
                        <Text style={[appStyles.text, appStyles.title]}>
                            {book.title}
                        </Text>
                        <Text style={[appStyles.text]}>
                            {localizer.localize('book-by-label')} {book.authors.join(', ')}
                        </Text>
                        <Text style={[appStyles.text]}>
                            {book.pages} {localizer.localize('book-pages-label')}
                        </Text>
                    </View>
                </View>
                <View style={[appStyles.vertical, appStyles.justifyCenter]}>
                    <Button style={[appStyles.button]}
                            color={appColors.color3}
                            onPress={() => onEditClick(book)}
                            title={localizer.localize('edit-button')}/>
                    <Button style={[appStyles.button]}
                            color={appColors.color3}
                            onPress={() => onDeleteClick(book)}
                            title={localizer.localize('delete-button')}/>
                </View>
            </View>
        </View>
    );
}

BookComponent.propTypes = {
    book: PropTypes.shape({
        isbn10: PropTypes.string,
        isbn13: PropTypes.string,
        image: PropTypes.string,
        title: PropTypes.string.isRequired,
        authors: PropTypes.arrayOf(PropTypes.string).isRequired,
        pages: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]).isRequired,
    }).isRequired,
    onReadClick: PropTypes.func.isRequired,
    onEditClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired
};

export default BookComponent;
