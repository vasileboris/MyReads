import React from 'react';
import PropTypes from 'prop-types';
import Image from './Image';

const assets = {
    '/menu/menu.png': require('../../assets/menu/menu.png'),
    '/menu/home.png': require('../../assets/menu/home.png'),
    '/menu/info.png': require('../../assets/menu/info.png'),
    '/menu/help.png': require('../../assets/menu/help.png'),
    '/menu/lock.png': require('../../assets/menu/lock.png'),

    '/help/reading-session-progress.png': require('../../assets/help/reading-session-progress.png'),
    '/help/add-book.png': require('../../assets/help/add-book.png'),
    '/help/edit-book.png': require('../../assets/help/edit-book.png'),
    '/help/delete-book.png': require('../../assets/help/delete-book.png'),
    '/help/all-books.png': require('../../assets/help/all-books.png'),
    '/help/filtered-books.png': require('../../assets/help/filtered-books.png'),
    '/help/add-reading-session.png': require('../../assets/help/add-reading-session.png'),
    '/help/edit-reading-session.png': require('../../assets/help/edit-reading-session.png'),
    '/help/delete-reading-session.png': require('../../assets/help/delete-reading-session.png'),

    '/about/book.png': require('../../assets/about/book.png'),
    '/about/open-book.png': require('../../assets/about/open-book.png'),
    '/about/menu.png': require('../../assets/about/menu.png'),
    '/about/home.png': require('../../assets/about/home.png'),
    '/about/info.png': require('../../assets/about/info.png'),
    '/about/help.png': require('../../assets/about/help.png'),
    '/about/lock.png': require('../../assets/about/lock.png'),
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
