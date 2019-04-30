import { StyleSheet } from 'react-native';
import appColors from "./AppColors";
import appSizes from "./AppSizes";

const appStyles = StyleSheet.create({
    app: {
        marginTop: appSizes.appMarginTop(),
        backgroundColor: appColors.color2,
    },

    navigationBarHeaderStyle: {
        height: appSizes.navigationBarHeight,
        backgroundColor: appColors.color1
    },

    navigationBarTitleStyle: {
        fontFamily: 'sans-serif',
        fontSize: 18,
        fontWeight: 'bold'
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

    justifySpaceAround: {
        justifyContent: 'space-around',
    },

    justifyEnd: {
        justifyContent: 'flex-end',
    },

    alignItemsCenter: {
        alignItems: 'center',
    },

    screen: {
        marginTop: appSizes.margin,
        marginLeft: appSizes.margin,
        marginRight: appSizes.margin,
        width: appSizes.resultWidth(),
        height: appSizes.appHeight(),
    },

    screenSectionA1: {
        height: appSizes.screenSectionA1Height(),
    },

    screenSectionB1: {
        height: appSizes.screenSingleSectionB1Height(),
    },

    screenSectionA2: {
        width: appSizes.screenSectionA1Width(),
        paddingLeft: appSizes.padding,
    },

    entry: {
        width: appSizes.entryWidth(),
    },

    result: {
        width: appSizes.resultWidth(),
        marginTop: appSizes.margin,
    },

    resultDetail: {
        borderTopColor: appColors.color3,
        borderTopWidth: 1,
    },

    resultDetailsSection: {
        marginLeft: appSizes.margin,
        width: appSizes.resultDetailsSectionWidth()
    },

    text: {
        fontFamily: 'sans-serif',
        fontSize: 16
    },

    title: {
        fontWeight: 'bold',
        color: appColors.color3,
    },

    textEntry: {
        marginBottom: appSizes.margin,
        padding: appSizes.smallPadding,
        width: appSizes.entryWidth(),
        borderColor: appColors.color3,
        borderWidth: 1
    },

    button: {
        marginBottom: appSizes.margin,
    },

    marginBottom: {
        marginBottom: appSizes.margin
    }

});

export default appStyles;
