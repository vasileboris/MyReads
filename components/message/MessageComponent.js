import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import appStyles from 'styles/AppStyles';
import appSizes from 'styles/AppSizes';
import appColors from 'styles/AppColors';

const styles = StyleSheet.create({
    messageView: {
        marginBottom: appSizes.margin
    },
    messageText: {
        padding: appSizes.padding,
        color: appColors.colorTextMessage,
        backgroundColor: appColors.colorMessage,
        textAlign: "center"
    },
});

const MessageComponent = props => {
    const { message } = props;
    return message && (
        <View style={[styles.messageView]}>
            <Text style={[appStyles.text, styles.messageText]}>{message}</Text>
        </View>
    );
};

MessageComponent.propTypes = {
    message: PropTypes.string
};

export default MessageComponent;
