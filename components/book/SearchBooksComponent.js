import React from 'react';
import localizer from 'utils/Localizer';
import PropTypes from 'prop-types';
import {
    View,
    TextInput
} from 'react-native';
import Button from 'components/button/Button';
import appStyles from "styles/AppStyles";
import appColors from "styles/AppColors";

function SearchBooksComponent(props) {
    const { booksSearchText, onInputChange, onAddClick } = props;
    return (
        <View style={[appStyles.vertical, appStyles.justifyStart]}>
            <TextInput style={[appStyles.text, appStyles.textEntry]}
                   placeholder={localizer.localize('books-search-text')}
                   value={booksSearchText}
                   onChangeText={(text) => onInputChange(text)}/>
            <Button style={[appStyles.button]}
                    color={appColors.color3}
                    onPress={onAddClick}
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

