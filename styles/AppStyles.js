import { StyleSheet } from 'react-native';
import appColors from "./AppColors";
import appSizes from "./AppSizes";

const appStyles = StyleSheet.create({
    app: {
        marginTop: appSizes.appMarginTop(),
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

    alignItemsCenter: {
        alignItems: 'center',
    },

    text: {
        fontFamily: 'sans-serif',
        fontSize: 16
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
        marginBottom: appSizes.margin,
    },

    result: {
        width: appSizes.resultWidth(),
        marginTop: appSizes.margin,
        marginRight: appSizes.margin,
        marginBottom: 0,
        marginLeft: appSizes.margin,
    },

    resultDetail: {
        paddingTop: appSizes.smallMargin,
        borderTopColor: appColors.color3,
        borderTopWidth: 1,
    },

    resultSingle: {
        marginLeft: appSizes.margin,
        marginRight: appSizes.margin,
        width: appSizes.resultWidth(),
        height: appSizes.resultSingleHeight(),
    },

    resultSingleSectionA1: {
        height: appSizes.resultSingleSectionA1Height(),
    },

    resultSingleSectionB1: {
        height: appSizes.resultSingleSectionB1Height(),
    },

    resultSingleSectionA2: {
        width: appSizes.resultSingleSectionA1Width(),
        paddingLeft: appSizes.margin,
    },

        resultText: {
        marginLeft: appSizes.margin,
        width: appSizes.resultTextWidth()
    }
});

export default appStyles;
