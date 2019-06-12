import React from 'react';
import PropTypes from 'prop-types';
import Image from './Image';

const assets = {
    '/help/book.png': require('../../assets/help/book.png')
};

function AssetImage(props) {
    const { folder, image, size } = props;
    return <Image image={buildImage(folder, image)} size={size}/>;
}

function buildImage(folder, image) {
    const source = assets[`/${folder}/${image}`];
    return { source };
}

AssetImage.propTypes = {
    folder: PropTypes.string,
    image: PropTypes.string,
    size: PropTypes.string
};

export default AssetImage;
