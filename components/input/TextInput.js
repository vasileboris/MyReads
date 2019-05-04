import React from 'react';
import PropTypes from 'prop-types';
import {
    TextInput as RNTextInput
} from 'react-native';
import appStyles from 'styles/AppStyles';

const TextInput = props => {
    const { name, placeholder, value, onInputChange, editable = true } = props;
    const styles = [appStyles.text, appStyles.textEntry];
    if(!editable) {
        styles.push(appStyles.disabled);
    }
    return (
        <RNTextInput style={styles}
                     name={name}
                     placeholder={placeholder}
                     value={value}
                     onChangeText={(value) => onInputChange(value, name)}
                     editable={editable}/>
    );
};


TextInput.propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onInputChange: PropTypes.func.isRequired,
    editable: PropTypes.bool
};

export default TextInput;
