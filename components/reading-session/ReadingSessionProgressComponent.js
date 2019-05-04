import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View
} from 'react-native';
import localizer from 'utils/Localizer';
import appStyles from 'styles/AppStyles';

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
            <Text>
                <Text style={[appStyles.text, appStyles.title]}>
                    {readingSessionProgress.readPercentage}%
                </Text>
                <Text style={[appStyles.text]}>
                    {localizer.localize('reading-session-progress-status-label')}
                </Text>
            </Text>
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
