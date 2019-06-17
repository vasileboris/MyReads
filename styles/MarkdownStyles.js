import appColors from './AppColors';
import appSizes from './AppSizes';

const markdownStyles = {
    heading1: {
        fontSize: appSizes.h1Size(),
        marginBottom: appSizes.margin,
        color: appColors.color3,
    },
    heading2: {
        fontSize: appSizes.h2Size(),
        marginTop: appSizes.margin,
        marginBottom: appSizes.margin,
        color: appColors.color3,
    },
    heading3: {
        fontSize: appSizes.h3Size(),
        marginTop: appSizes.smallMargin,
        marginBottom: appSizes.smallMargin,
        color: appColors.color3,
    },
    text: {
        fontFamily: 'sans-serif',
        fontSize: appSizes.fontSize,
        marginTop: appSizes.smallMargin,
        marginBottom: appSizes.smallMargin,
    },
    link: {
        textDecorationLine: 'underline',
    }
};

export default markdownStyles;
