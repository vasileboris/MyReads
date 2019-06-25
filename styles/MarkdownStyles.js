import appColors from './AppColors';
import appSizes from './AppSizes';

const markdownStyles = {
    heading1: {
        fontFamily: 'Roboto',
        fontSize: appSizes.h1Size(),
        marginBottom: appSizes.margin,
        color: appColors.color3,
    },
    heading2: {
        fontFamily: 'Roboto',
        fontSize: appSizes.h2Size(),
        marginTop: appSizes.margin,
        marginBottom: appSizes.margin,
        color: appColors.color3,
    },
    heading3: {
        fontFamily: 'Roboto',
        fontSize: appSizes.h3Size(),
        marginTop: appSizes.smallMargin,
        marginBottom: appSizes.smallMargin,
        color: appColors.color3,
    },
    text: {
        fontFamily: 'Roboto',
        fontSize: appSizes.fontSize,
        marginTop: appSizes.smallMargin,
        marginBottom: appSizes.smallMargin,
    },
    link: {
        fontFamily: 'Roboto',
        fontSize: appSizes.fontSize,
        marginTop: appSizes.smallMargin,
        marginBottom: appSizes.smallMargin,
        textDecorationLine: 'underline',
    }
};

export default markdownStyles;
