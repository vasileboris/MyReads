import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Animated
} from 'react-native';
import appStyles from 'styles/AppStyles';
import appColors from 'styles/AppColors';

const ProgressBarComponent = props => {
    const { value } = props;
    return value && (
        <View style={[appStyles.progressBar]}>
            <Animated.View style={[
                appStyles.absoluteFill,
                {
                    backgroundColor: appColors.color4,
                    width: `${value}%`
                }
            ]}/>
        </View>
    );
};

ProgressBarComponent.propTypes = {
    value: PropTypes.number
};

export default ProgressBarComponent;
