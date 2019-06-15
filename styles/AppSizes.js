import {
    Dimensions,
    Platform
} from 'react-native';
import { Constants } from "expo";

const PHI = 1.618;
const BOOK_HW_RATIO = 1.5;

const appSizes = {
    navigationBarHeight: 50,
    smallMargin: 5,
    margin: 10,
    smallPadding: 5,
    padding: 10,

    phoneStatusBarHeight: function() {
        return 'android' === Platform.OS ? Constants.statusBarHeight : 0;
    },

    phoneScreenWidth: function() {
        return Dimensions.get('window').width
    },

    phoneScreenHeight: function() {
        return Dimensions.get('window').height
    },

    appMarginTop: function() {
        return 0;
    },

    appWidth: function() {
        return this.phoneScreenWidth() - 2 * this.margin;
    },

    appHeight: function() {
        return this.phoneScreenHeight() - this.phoneStatusBarHeight() - this.navigationBarHeight - 2 * this.margin;
    },

    goldenSegments: function(value, level = 1) {
        const a = value / PHI;
        if(level <= 1) {
            return {
                a,
                b: value - a
            }
        }
        return this.goldenSegments(a, level - 1);
    },

    appWidthGoldenSegments: function(level = 1) {
        return this.goldenSegments(this.appWidth(), level);
    },

    appHeightGoldenSegments: function(level = 1) {
        return this.goldenSegments(this.appHeight(), level);
    },

    screenSectionA1Height: function() {
        return this.appHeightGoldenSegments(1).a;
    },

    screenSingleSectionB1Height: function() {
        return this.appHeightGoldenSegments(1).b;
    },

    screenSectionA1Width: function() {
        return this.appWidthGoldenSegments(1).a;
    },

    screenSectionB1Width: function() {
        return this.appWidthGoldenSegments(1).b;
    },

    entryWidth: function() {
        return this.appWidth();
    },

    resultWidth: function() {
        return this.appWidth();
    },

    resultDetailsSectionWidth: function() {
        return this.resultWidth() - this.smallImageWidth() - this.margin;
    },

    largeImageWidth: function() {
        return this.appWidthGoldenSegments(1).b;
    },

    largeImageHeight: function() {
        return this.largeImageWidth() * BOOK_HW_RATIO;
    },

    smallImageWidth: function() {
        return this.appWidthGoldenSegments(2).b;
    },

    smallImageHeight: function() {
        return this.smallImageWidth() * BOOK_HW_RATIO;
    },

    menuImageWidth: function() {
        return 24;
    },

    menuImageHeight: function() {
        return 24;
    },

};

export default appSizes;
