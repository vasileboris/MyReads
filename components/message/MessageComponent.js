import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    StyleSheet
} from 'react-native';
import appStyles from 'styles/AppStyles';
import appSizes from 'styles/AppSizes';
import appColors from 'styles/AppColors';

const styles = StyleSheet.create({
    message: {
        padding: appSizes.padding,
        color: appColors.colorTextMessage,
        backgroundColor: appColors.colorMessage,
        textAlign: "center"
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
