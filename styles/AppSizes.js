const appSizes = {
    sixColumnWidth: 140,
    smallMargin: 5,
    margin: 10,
    smallImageWidth: function() {
        return this.sixColumnWidth;
    },
    smallImageHeight: 174,
    largeImageWidth: function() {
        return this.sixColumnWidth;
    },
    largeImageHeight: 174,
    elementWidth: function() {
        return this.sixColumnWidth;
    }
};

export default appSizes;