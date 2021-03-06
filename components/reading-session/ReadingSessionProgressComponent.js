import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View
} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import localizer from 'utils/Localizer';
import appStyles from 'styles/AppStyles';
import appSizes from 'styles/AppSizes';
import appColors from 'styles/AppColors';

function ReadingSessionProgressComponent (props) {
    const  { readingSessionProgress } = props;
    if(!readingSessionProgress) {
        return (
            <View style={[appStyles.vertical, appStyles.justifyCenter]}>
                <Text style={[appStyles.text, appStyles.title]}>
                    {localizer.localize('reading-session-progress-none')}
                </Text>
            </View>
        );
    }
    return (
        <View style={[appStyles.vertical, appStyles.justifyCenter]}>
            <View style={[appStyles.horizontal, appStyles.justifyCenter, appStyles.marginBottom]}>
                <ProgressCircle
                    percent={readingSessionProgress.readPercentage}
                    radius={appSizes.progressCircleWidth()}
                    borderWidth={appSizes.progressCircleBorder()}
                    color={appColors.color4}
                    shadowColor={appColors.color5}
                    bgColor={appColors.color2}>

                    <Text style={[appStyles.text, appStyles.emphasis]}>
                        {readingSessionProgress.readPercentage}%
                    </Text>
                </ProgressCircle>
            </View>

            <View style={[appStyles.vertical, appStyles.justifyCenter]}>
                <Text>
                    <Text style={[appStyles.text, appStyles.title]}>
                        {readingSessionProgress.averagePagesPerDay}
                    </Text>
                    <Text style={[appStyles.text]}>
                        {' '}
                    </Text>
                    <Text style={[appStyles.text]}>
                        {localizer.localize('reading-session-progress-average-pages-label')}
                    </Text>
                </Text>
                { readingSessionProgress.estimatedReadDaysLeft > 0 && (
                <React.Fragment>
                    <Text>
                        <Text style={[appStyles.text, appStyles.title]}>
                            {readingSessionProgress.pagesTotal - readingSessionProgress.lastReadPage}
                        </Text>
                        <Text style={[appStyles.text]}>
                            {' '}
                        </Text>
                        <Text style={[appStyles.text]}>
                            {localizer.localize('reading-session-progress-estimated-pages-left-label')}
                        </Text>
                    </Text>
                    <Text>
                        <Text style={[appStyles.text, appStyles.title]}>
                            {readingSessionProgress.estimatedReadDaysLeft}
                        </Text>
                        <Text style={[appStyles.text]}>
                            {' '}
                        </Text>
                        <Text style={[appStyles.text]}>
                            {localizer.localize('reading-session-progress-estimated-read-days-left-label')}
                        </Text>
                        <Text style={[appStyles.text]}>
                            {' / '}
                        </Text>
                        <Text style={[appStyles.text, appStyles.title]}>
                            {readingSessionProgress.estimatedDaysLeft}
                        </Text>
                        <Text style={[appStyles.text]}>
                            {' '}
                        </Text>
                        <Text style={[appStyles.text]}>
                            {localizer.localize('reading-session-progress-estimated-days-left-label')}
                        </Text>
                    </Text>
                    <Text>
                        <Text style={[appStyles.text]}>
                            {localizer.localize('reading-session-progress-estimated-finish-date-label')}
                        </Text>
                        <Text style={[appStyles.text]}>
                            {' '}
                        </Text>
                        <Text style={[appStyles.text, appStyles.title]}>
                            {localizer.toLocaleDateString(readingSessionProgress.estimatedFinishDate)}
                        </Text>
                    </Text>
                    {readingSessionProgress.deadline ? (
                    <Text>
                        <Text style={[appStyles.text, appStyles.title]}>
                            {localizer.localize('reading-session-progress-deadline-label')}
                        </Text>
                        <Text style={[appStyles.text]}>
                            {' '}
                        </Text>
                        <Text style={[appStyles.text, appStyles.title]}>
                            {readingSessionProgress.deadline}
                        </Text>
                    </Text>
                    ) : null}
                </React.Fragment>
                )}
            </View>
        </View>
    );
}

ReadingSessionProgressComponent.propTypes = {
    readingSessionProgress: PropTypes.shape({
        readPercentage: PropTypes.number.isRequired,
        averagePagesPerDay: PropTypes.number.isRequired,
        pagesTotal: PropTypes.number.isRequired,
        lastReadPage: PropTypes.number.isRequired,
        estimatedReadDaysLeft: PropTypes.number.isRequired,
        estimatedDaysLeft: PropTypes.number.isRequired,
        estimatedFinishDate: PropTypes.string,
        deadline: PropTypes.string
    })
};

export default ReadingSessionProgressComponent;
