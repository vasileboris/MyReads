import { StyleSheet, Platform } from 'react-native';
import { Constants } from 'expo';
import appColors from "./AppColors";
import appSizes from "./AppSizes";

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

    title: {
        fontWeight: "bold"
    },

    entry: {
        width: appSizes.entryWidth(),
        margin: appSizes.margin,
        padding: appSizes.padding
    },

    resultSingle: {
        width: appSizes.resultWidth(),
        margin: appSizes.margin
    },

    resultImportant: {
        fontWeight: "bold",
        color: appColors.color3
    },

    resultDetail: {
        marginTop: appSizes.smallMargin,
        paddingTop: appSizes.smallMargin,
        borderTopColor: appColors.color3,
        borderTopWidth: 1
    }
});

export default appStyles;