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
        flexWrap: 'nowrap',
    },

    vertical: {
        flexDirection: 'column',
        flexWrap: 'nowrap',
    },

    justifyCenter: {
        justifyContent: 'center',
    },

    justifyStart: {
        justifyContent: 'flex-start',
    },

    justifySpaceBetween: {
        justifyContent: 'space-between',
    },

    text: {
        fontFamily: 'sans-serif',
    },

    title: {
        fontWeight: 'bold',
        color: appColors.color3,
    },

    entry: {
        width: appSizes.entryWidth(),
        marginTop: appSizes.margin,
        marginRight: appSizes.margin,
        marginBottom: 0,
        marginLeft: appSizes.margin,
        padding: appSizes.padding,
    },

    button: {
        marginTop: appSizes.margin,
        marginBottom: appSizes.margin
    },

    result: {
        width: appSizes.resultWidth(),
        marginTop: appSizes.margin,
        marginRight: appSizes.margin,
        marginBottom: 0,
        marginLeft: appSizes.margin,
        borderTopColor: appColors.color3,
    },

    resultDetail: {
        marginTop: appSizes.smallMargin,
        paddingTop: appSizes.smallMargin,
        borderTopColor: appColors.color3,
        borderTopWidth: 1,
    },

    resultText: {
        marginLeft: appSizes.margin,
        width: appSizes.resultTextWidth()
    }
});

export default appStyles;
