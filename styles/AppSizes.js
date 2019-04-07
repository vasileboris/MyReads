import { Dimensions } from 'react-native';

const appSizes = {
    sixColumnWidth: 140,
    smallMargin: 5,
    margin: 10,
    padding: 10,
    screenWidth: function() {
        return Dimensions.get('window').width
    },
    smallImageWidth: function() {
        return this.sixColumnWidth;
    },
    smallImageHeight: 174,
    largeImageWidth: function() {
        return this.sixColumnWidth;
    },
    largeImageHeight: 174,
    entryWidth: function() {
        return this.screenWidth() - 2 * this.margin;
    },
    resultWidth: function() {
        return this.sixColumnWidth;
    }
};

export default appSizes;