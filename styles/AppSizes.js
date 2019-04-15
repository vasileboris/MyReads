import {
    Dimensions,
    Platform
} from 'react-native';
import { Constants } from "expo";

const PHI = 1.618;
const BOOK_HW_RATIO = 1.5;

const appSizes = {
    sixColumnWidth: 140,
    smallMargin: 5,
    margin: 10,
    padding: 10,

    appMarginTop: function() {
        return 'android' === Platform.OS ? Constants.statusBarHeight : 0
    },

    screenWidth: function() {
        return Dimensions.get('window').width
    },

    screenHeight: function() {
        return Dimensions.get('window').height
    },

    appWidth: function() {
        return this.screenWidth() - 2 * this.margin;
    },

    appHeight: function() {
        return this.screenHeight() - this.appMarginTop()  - 2 * this.margin;
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

    appHeighGoldenSegments: function(level = 1) {
        return this.goldenSegments(this.appHeight(), level);
    },

    entryWidth: function() {
        return this.appWidth();
    },

    resultWidth: function() {
        return this.appWidth();
    },

    resultSingleHeight: function() {
        return this.appHeight();
    },

    resultSingleSectionHeight: function() {
        return this.resultSingleHeight() / 2;
    },

    resultSingleSectionZoneHeight: function() {
        return this.resultSingleSectionHeight() / 2;
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

    resultTextWidth: function() {
        return this.resultWidth() - this.smallImageWidth() - this.margin;
    }
};

export default appSizes;
