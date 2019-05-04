import React from 'react';
import PropTypes from 'prop-types';
import RNDatePicker from 'react-native-datepicker'
import appStyles from 'styles/AppStyles';
import appSizes from 'styles/AppSizes';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    dateIcon: {
        right: 0,
        width: 25
    },
    dateInput: {
        borderWidth: 0,
        alignItems: 'flex-start'
    },
    dateText: {
        padding: appSizes.smallPadding
    },
});

const DatePicker = props => {
    const { name, value, placeholder, onInputChange, editable = true } = props;
    return (
        <RNDatePicker
            style={[appStyles.dateEntry]}
            date={value}
            mode='date'
            placeholder={placeholder}
            format='YYYY-MM-DD'
            minDate='2019-01-01'
            maxDate='2099-12-31'
            hideText={false}
            customStyles={{
                dateIcon: [styles.dateIcon],
                dateInput: [styles.dateInput],
                dateText: [appStyles.text, styles.dateText]
            }}
            onDateChange={date => onInputChange(date, name)}
            disabled={!editable}
        />
    );
};

DatePicker.propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onInputChange: PropTypes.func.isRequired,
    editable: PropTypes.bool
};

export default DatePicker;
