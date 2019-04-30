import React from 'react';
import PropTypes from 'prop-types';
import {
    TextInput as RNTextInput
} from 'react-native';
import appStyles from 'styles/AppStyles';

const TextInput = props => {
    const { name, placeholder, value, onInputChange, editable = true } = props;
    return (
        <RNTextInput style={[appStyles.text, appStyles.textEntry]}
                     keyboardType='numeric'
                     name={name}
                     placeholder={placeholder}
                     value={value + ''}
                     onChangeText={(value) => onInputChange(sanitiseValue(value), name)}
                     editable={editable}/>
    );
};

const sanitiseValue = (value) => value
    .split('')
    .reduce((res, s) => `${res}${s.match(/[0-9]/) ? s : ''}`, '');

TextInput.propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.oneOf(
        PropTypes.number,
        PropTypes.string
    ),
    onInputChange: PropTypes.func.isRequired,
    editable: PropTypes.bool
};

export default TextInput;
