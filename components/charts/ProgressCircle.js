import React from 'react';
import PropTypes from 'prop-types';
import {
    Text
} from 'react-native';
import RNProgressCircle from 'react-native-progress-circle';
import appStyles from 'styles/AppStyles';
import appColors from 'styles/AppColors';
import appSizes from 'styles/AppSizes';

const ProgressBar = props => {
    const { readingSessionProgress, radius, borderWidth } = props;
    return (
        <RNProgressCircle
            percent={readingSessionProgress.readPercentage}
            radius={appSizes.progressCircleRadius()}
            borderWidth={appSizes.progressCircleBorder()}
            color={appColors.color4}
            shadowColor={appColors.color5}
            bgColor={appColors.color1}>

            <Text style={[appStyles.text, appStyles.emphasis, appStyles.h1]}>
                {readingSessionProgress.readPercentage}%
            </Text>
        </RNProgressCircle>
    );
};

ProgressBar.propTypes = {
    readingSessionProgress: PropTypes.object,
    radius: PropTypes.number,
    borderWidth: PropTypes.number
};

export default ProgressBar;
