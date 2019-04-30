import React from 'react';
import PropTypes from 'prop-types';
import {
    View
} from 'react-native';
import Button from 'components/button/Button';
import TextInput from 'components/input/TextInput';
import appStyles from "styles/AppStyles";
import localizer from 'utils/Localizer';

function SearchBooksComponent(props) {
    const { booksSearchText, onInputChange, onAddClick } = props;
    return (
        <View style={[appStyles.vertical, appStyles.justifyStart]}>
            <TextInput placeholder={localizer.localize('books-search-text')}
                       value={booksSearchText}
                       onInputChange={onInputChange}/>
            <Button onPress={onAddClick}
                    title={localizer.localize('book-add-button')}/>
        </View>
    );
}

SearchBooksComponent.propTypes = {
    booksSearchText: PropTypes.string,
    onInputChange: PropTypes.func.isRequired,
    onAddClick: PropTypes.func.isRequired
};

export default SearchBooksComponent;

