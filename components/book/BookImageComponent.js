import React from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    StyleSheet
} from 'react-native';
import appSizes from '/styles/AppSizes';

const styles = StyleSheet.create({
    smallImage: {
        width: appSizes.smallImageWidth(),
        height: appSizes.smallImageHeight
    },
    largeImage: {
        width: appSizes.largeImageWidth(),
        height: appSizes.largeImageHeight
    },
});

function BookImageComponent(props) {
    const { image, size } = props;
    const imgAttributes = buildImgAttributes(image);
    return <Image source={imgAttributes.src} style={[styles[`${size}Image`]]}/>;
}

function buildImgAttributes(image) {
    let src = require('../../assets/images/book.png');
    if (image) {
        src = {uri: image};
    }
    return { src };
}

BookImageComponent.propTypes = {
    image: PropTypes.string,
    size: PropTypes.string.isRequired
};

export default BookImageComponent;