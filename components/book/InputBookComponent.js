import React from 'react';
import PropTypes from 'prop-types';
import {
    View
} from 'react-native';
import appStyles from 'styles/AppStyles';
import appColors from 'styles/AppColors';
import localizer from 'utils/Localizer';
import TextInput from 'components/input/TextInput';
import NumberInput from 'components/input/NumberInput';
import Button from 'components/button/Button';

const InputBookComponent = props => {
    const { operation, book, onInputChange, onAddButtonClick, onUpdateButtonClick, onDeleteButtonClick, onCancelButtonClick } = props;
    return (
        <View style={[appStyles.entry, appStyles.vertical, appStyles.justifyStart]}>
            <TextInput name="title"
                       placeholder={localizer.localize('book-title-text')}
                       value={book.title ? book.title : ''}
                       onInputChange={onInputChange}
                       editable={'delete' !== operation}/>
            <TextInput name="authors"
                       placeholder={localizer.localize('book-authors-text')}
                       value={book.authors ? book.authors.join(',') : ''}
                       onInputChange={onInputChange}
                       editable={'delete' !== operation}/>
            <NumberInput name="pages"
                         placeholder={localizer.localize('book-pages-text')}
                         value={book.pages ? book.pages : '' }
                         onInputChange={onInputChange}
                         editable={'delete' !== operation}/>

            {'add' === operation && (
            <Button onPress={onAddButtonClick}
                    title={localizer.localize('add-button')}/>
            )}
            {'edit' === operation && (
            <Button onPress={onUpdateButtonClick}
                    title={localizer.localize('update-button')}/>
            )}
            {'delete' === operation && (
            <Button onPress={onDeleteButtonClick}
                    title={localizer.localize('delete-button')} color={appColors.colorDelete}/>
            )}
            <Button onPress={onCancelButtonClick}
                    title={localizer.localize('cancel-button')}/>
        </View>
    );
};

InputBookComponent.propTypes = {
    operation: PropTypes.oneOf(['add', 'edit', 'delete']).isRequired,
    book: PropTypes.shape({
        isbn10: PropTypes.string,
        isbn13: PropTypes.string,
        image: PropTypes.string,
        title: PropTypes.string,
        authors: PropTypes.arrayOf(PropTypes.string),
        pages: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
    }).isRequired,
    onInputChange: PropTypes.func.isRequired,
    onAddButtonClick: PropTypes.func,
    onUpdateButtonClick: PropTypes.func,
    onDeleteButtonClick: PropTypes.func,
    onCancelButtonClick: PropTypes.func
};

export default InputBookComponent;

