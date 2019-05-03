import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View
} from 'react-native';
import localizer from 'utils/Localizer';
import appStyles from 'styles/AppStyles';

function DateReadingSessionComponent(props) {
    const { dateReadingSession } = props;

    return (
        <View style={[appStyles.result, appStyles.horizontal, appStyles.justifyStart, appStyles.alignItemsCenter]}>
            <Text style={[appStyles.text, appStyles.title]}>{localizer.toLocaleDateString(dateReadingSession.date)}</Text>
            <View style={[appStyles.resultDetailsSection, appStyles.vertical, appStyles.justifyCenter]}>
                <Text style={[appStyles.text, appStyles.title]}>
                    {localizer.localize('date-reading-session-last-read-page-label', dateReadingSession.lastReadPage)}
                </Text>
                {dateReadingSession.bookmark && (
                    <Text style={[appStyles.text]}>
                        {localizer.localize('date-reading-session-bookmark-label')} {dateReadingSession.bookmark}
                    </Text>
                )}
            </View>
        </View>
    );
}

DateReadingSessionComponent.propTypes = {
    dateReadingSession: PropTypes.shape({
        date: PropTypes.string.isRequired,
        lastReadPage: PropTypes.number.isRequired,
        bookmark: PropTypes.string
    }).isRequired,
};

export default DateReadingSessionComponent;
