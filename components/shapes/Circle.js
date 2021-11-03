import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet
} from 'react-native';

const Circle = props => {
    const { diameter, color, margin } = props;

    const styles = StyleSheet.create({
        circle: {
            width: diameter,
            height: diameter,
            borderRadius: diameter / 2,
            backgroundColor: color,
            margin: margin
        }
    });

    return <View style={styles.circle} />;
};


Circle.propTypes = {
    diameter: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    margin: PropTypes.number
};

export default Circle;
