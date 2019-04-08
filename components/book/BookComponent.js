import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text
} from 'react-native';
import localizer from 'utils/Localizer';
import BookImageComponent from './BookImageComponent';
import Button from 'components/button/Button';
import appStyles from 'styles/AppStyles';
import appColors from 'styles/AppColors';

function BookComponent(props) {
    const { book, onReadClick, onEditClick, onDeleteClick } = props;
    return (
        <View style={[appStyles.result]}>
            <View style={[appStyles.vertical]}>
                <BookImageComponent image={book.image} size="small"/>
                <Button style={[appStyles.button]}
                        color={appColors.color3}
                        onPress={() => onReadClick(book)}
                        title={localizer.localize('read-button')}/>

                <View style={[appStyles.resultDetail, appStyles.vertical]}>
                    <View>
                        <Text style={[appStyles.text, appStyles.title, appStyles.resultImportant]}>
                            {book.title}
                        </Text>
                        <Text style={[appStyles.text]}>
                            {localizer.localize('book-by-label')} {book.authors.join(', ')}
                        </Text>
                        <Text style={[appStyles.text]}>
                            {book.pages} {localizer.localize('book-pages-label')}
                        </Text>
                    </View>
                    {/*
                    <View className="buttons small container horizontal">
                        <Button className="button"
                                onClick={() => onEditClick(book)}>
                            {localizer.localize('edit-button')}
                        </Button>
                        <Button className="button"
                                onClick={() => onDeleteClick(book)}>
                            {localizer.localize('delete-button')}
                        </Button>
                    </View>
                    */}
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