import React from 'react';
import PropTypes from 'prop-types';
import {
    Image as RNImage,
    StyleSheet
} from 'react-native';
import appSizes from 'styles/AppSizes';

const styles = StyleSheet.create({
    menuImage: {
        width: appSizes.menuImageWidth(),
        height: appSizes.menuImageHeight()
    },
    smallRectangleImage: {
        width: appSizes.smallImageWidth(),
        height: appSizes.smallImageHeight()
    },
    largeRectangleImage: {
        width: appSizes.largeImageWidth(),
        height: appSizes.largeImageHeight()
    },
    smallSquareImage: {
        width: appSizes.smallImageWidth(),
        height: appSizes.smallImageWidth()
    },
    largeSquareImage: {
        width: appSizes.largeImageWidth(),
        height: appSizes.largeImageWidth()
    },
    originalImage: {
    },
});

function Image(props) {
    const { image, size } = props;
    return <RNImage source={image.source} style={[styles[`${size}Image`]]}/>;
}

Image.propTypes = {
    image: PropTypes.shape({
        source: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.shape({
                uri: PropTypes.string
            })
        ])
    }),
    size: PropTypes.string.isRequired
};

export default Image;
