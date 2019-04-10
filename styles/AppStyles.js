import { StyleSheet, Platform } from 'react-native';
import { Constants } from 'expo';
import appColors from "./AppColors";
import appSizes from "./AppSizes";

const appStyles = StyleSheet.create({
    app: {
        marginTop: 'android' === Platform.OS ? Constants.statusBarHeight : 0,
        backgroundColor: appColors.color2,
    },

    container: {
        flex: 1,
    },

    horizontal: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },

    vertical: {
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
    },

    text: {
        fontFamily: 'sans-serif',
    },

    title: {
        fontWeight: 'bold',
    },

    entry: {
        width: appSizes.entryWidth(),
        margin: appSizes.margin,
        padding: appSizes.padding,
    },

    button: {
        marginTop: appSizes.margin,
        marginBottom: appSizes.margin
    },

    result: {
        width: appSizes.resultWidth(),
        margin: appSizes.margin,
        paddingTop: appSizes.smallMargin,
        borderTopColor: appColors.color3,
        borderTopWidth: 4,
    },

    resultSingle: {
        width: appSizes.resultWidth(),
        margin: appSizes.margin,
    },

    resultImportant: {
        fontWeight: 'bold',
        color: appColors.color3,
    },

    resultDetail: {
        marginTop: appSizes.smallMargin,
        paddingTop: appSizes.smallMargin,
        borderTopColor: appColors.color3,
        borderTopWidth: 1,
    }
});

export default appStyles;