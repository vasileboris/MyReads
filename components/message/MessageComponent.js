import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';
import appStyles from '/styles/AppStyles';

const styles = StyleSheet.create({
    message: {
        color: 'white',
        backgroundColor: 'red'
    },
});

const MessageComponent = props => {
    const { message } = props;
    return message && (
        <Text style={[appStyles.text, styles.message]}>{message}</Text>
    );
};

MessageComponent.propTypes = {
    message: PropTypes.string
};

export default MessageComponent;