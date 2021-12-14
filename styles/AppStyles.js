import { StyleSheet } from 'react-native';
import appColors from './AppColors';
import appSizes from './AppSizes';

const appStyles = StyleSheet.create({
    app: {
        marginTop: appSizes.appMarginTop(),
        paddingTop: appSizes.phoneStatusBarHeight(),
        backgroundColor: appColors.color1,
    },

    navigationBarHeaderStyle: {
        height: appSizes.navigationBarHeight,
        backgroundColor: appColors.color1
    },

    navigationBarTitleStyle: {
        fontFamily: 'Roboto',
        fontSize: appSizes.navigationBarFontSize(),
        fontWeight: 'bold'
    },

    navigationBarMenuStyle: {
        fontFamily: 'Roboto',
        fontSize: appSizes.navigationBarFontSize(),
        fontWeight: 'normal'
    },

    activeNavigationBarMenuStyle: {
        fontFamily: 'Roboto',
        fontSize: appSizes.navigationBarFontSize(),
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
        width: appSizes.appWidth(),
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
        width: appSizes.resultWidth()
    },

    resultDetail: {
        borderTopColor: appColors.color3,
        borderTopWidth: 1
    },

    resultDetailsSection: {
        marginLeft: appSizes.margin,
        width: appSizes.resultDetailsSectionWidth()
    },

    text: {
        fontFamily: 'Roboto',
        fontSize: appSizes.fontSize
    },

    title: {
        fontWeight: 'bold',
        color: appColors.color3,
    },

    emphasis: {
        color: appColors.color4
    },

    h1: {
        fontSize: appSizes.h1Size()
    },

    textEntry: {
        marginBottom: appSizes.margin,
        padding: appSizes.smallPadding,
        width: appSizes.entryWidth(),
        borderColor: appColors.color3,
        borderWidth: 1
    },

    dateEntry: {
        marginBottom: appSizes.margin,
        width: appSizes.entryWidth(),
        borderColor: appColors.color3,
        borderWidth: 1
    },

    button: {
        marginBottom: appSizes.margin,
    },

    marginBottom: {
        marginBottom: appSizes.margin
    },

    disabled: {
        backgroundColor: appColors.colorDisabled
    },

    progressBar: {
        height: appSizes.progressBarHeight(),
        width: appSizes.progressBarWidth(),
        backgroundColor: appColors.color5,
        borderColor: appColors.color2,
        borderWidth: 0,
        borderRadius: 0
    },

    absoluteFill: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },

    borderAllAround: {
        borderColor: appColors.color3,
        borderWidth: 1,
    },

    card: {
        padding: appSizes.padding,
        backgroundColor: appColors.color1,
        borderRadius: 10
    },

    marginTop: {
        marginTop: appSizes.margin
    }
});

export default appStyles;
