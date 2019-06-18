import React from 'react';
import PropTypes from 'prop-types';
import Image from './Image';

const assets = {
    '/menu/menu.png': require('../../assets/menu/menu.png'),
    '/menu/home.png': require('../../assets/menu/home.png'),
    '/menu/info.png': require('../../assets/menu/info.png'),
    '/menu/help.png': require('../../assets/menu/help.png'),

    '/help/book.png': require('../../assets/help/book.png'),

    '/about/book.png': require('../../assets/about/book.png'),
    '/about/open-book.png': require('../../assets/about/open-book.png'),
    '/about/menu.png': require('../../assets/about/menu.png'),
    '/about/home.png': require('../../assets/about/home.png'),
    '/about/info.png': require('../../assets/about/info.png'),
    '/about/help.png': require('../../assets/about/help.png'),
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
