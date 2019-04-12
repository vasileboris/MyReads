import { Dimensions } from 'react-native';

const appSizes = {
    sixColumnWidth: 140,
    smallMargin: 5,
    margin: 10,
    padding: 10,
    smallImageWidth: 70,
    smallImageHeight: 87,
    largeImageWidth: 140,
    largeImageHeight: 174,
    screenWidth: function() {
        return Dimensions.get('window').width
    },
    entryWidth: function() {
        return this.screenWidth() - 2 * this.margin;
    },
    resultWidth: function() {
        return this.screenWidth() - 2 * this.margin;
    },
    resultTextWidth: function() {
        return this.resultWidth() - this.smallImageWidth - this.margin;
    }
};

export default appSizes;
