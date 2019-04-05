import React from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    image: {
        width: 140,
        height: 174
    },
});

function BookImageComponent(props) {
    const { image } = props;
    const imgAttributes = buildImgAttributes(image);
    return <Image source={imgAttributes.src} style={[styles.image]}/>;
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