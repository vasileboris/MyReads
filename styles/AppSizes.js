import {
    Dimensions,
    Platform
} from 'react-native';
import { Constants } from "expo";

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

    smallImageWidth: function() {
        return 70;
    },

    smallImageHeight: function() {
        return 87;
    },

    mediumImageWidth: function() {
        return this.smallImageWidth() * 2;
    },

    mediumImageHeight: function() {
        return this.smallImageHeight() * 2;
    },

    largeImageWidth: function() {
        return this.smallImageWidth() * 3;
    },

    largeImageHeight: function() {
        return this.smallImageHeight() * 3;
    },

    entryWidth: function() {
        return this.screenWidth() - 2 * this.margin;
    },

    resultWidth: function() {
        return this.screenWidth() - 2 * this.margin;
    },

    resultSingleHeight: function() {
        return this.screenHeight() - 2 * this.margin - this.appMarginTop();
    },

    resultSingleSectionHeight: function() {
        return this.resultSingleHeight() / 2;
    },

    resultSingleSectionZoneHeight: function() {
        return this.resultSingleSectionHeight() / 2;
    },

    resultTextWidth: function() {
        return this.resultWidth() - this.smallImageWidth - this.margin;
    }
};

export default appSizes;
