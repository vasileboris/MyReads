import React from 'react';
import PropTypes from 'prop-types';
import Image from './Image';

const assets = {
    'book.png': require('../../assets/images/book.png')
};

function AssetImage(props) {
    const { image } = props;
    return <Image image={buildImage(image)} size='large'/>;
}

function buildImage(image) {
    const source = assets[image];
    return { source };
}

AssetImage.propTypes = {
    image: PropTypes.string
};

export default AssetImage;
