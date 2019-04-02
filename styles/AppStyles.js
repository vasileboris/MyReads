import { StyleSheet, Platform } from 'react-native';
import { Constants } from 'expo';

const appStyles = StyleSheet.create({
    app: {
        marginTop: 'android' === Platform.OS ? Constants.statusBarHeight : 0
    },

    vertical: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch'
    },

    text: {
        fontFamily: 'sans-serif',
    },
});

export default appStyles;