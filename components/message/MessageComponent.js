import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    StyleSheet
} from 'react-native';
import appStyles from '/styles/AppStyles';
import appColors from '/styles/AppColors';

const styles = StyleSheet.create({
    text: {
        color: appColors.colorTextMessage,
        backgroundColor: appColors.colorMessage
    },
});

const MessageComponent = props => {
    const { message } = props;
    return message && (
        <Text style={[appStyles.text, styles.text]}>{message}</Text>
    );
};

MessageComponent.propTypes = {
    message: PropTypes.string
};

export default MessageComponent;