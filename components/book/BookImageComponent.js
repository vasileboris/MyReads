import React from 'react';
import PropTypes from 'prop-types';
import Image from 'components/image/Image';

function BookImageComponent(props) {
    const { image, size } = props;
    return <Image image={buildImage(image)} size={size}/>;
}

function buildImage(image) {
    let source = require('../../assets/images/book.png');
    if (image) {
        source = {uri: image};
    }
    return { source };
}

BookImageComponent.propTypes = {
    image: PropTypes.string,
    size: PropTypes.string.isRequired
};

export default BookImageComponent;
