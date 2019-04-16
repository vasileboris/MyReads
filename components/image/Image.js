import React from 'react';
import PropTypes from 'prop-types';
import {
    Image as RNImage,
    StyleSheet
} from 'react-native';
import appSizes from 'styles/AppSizes';

const styles = StyleSheet.create({
    smallImage: {
        width: appSizes.smallImageWidth(),
        height: appSizes.smallImageHeight()
    },
    largeImage: {
        width: appSizes.largeImageWidth(),
        height: appSizes.largeImageHeight()
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
