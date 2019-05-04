import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import localizer from 'utils/Localizer';
import appStyles from 'styles/AppStyles';

function DateReadingSessionComponent(props) {
    const { onClick, dateReadingSession } = props;

    return (
        <TouchableOpacity onPress={() => onClick(dateReadingSession)}>
            <View style={[appStyles.result, appStyles.vertical, appStyles.justifyStart]}>
                <Text style={[appStyles.text, appStyles.title]}>{localizer.toLocaleDateString(dateReadingSession.date)}</Text>
                <Text style={[appStyles.text]}>
                    {localizer.localize('date-reading-session-last-read-page-label', dateReadingSession.lastReadPage)}
                </Text>
                {!!dateReadingSession.bookmark && (
                    <Text style={[appStyles.text]}>
                        {localizer.localize('date-reading-session-bookmark-label')} {dateReadingSession.bookmark}
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    );
}

DateReadingSessionComponent.propTypes = {
    dateReadingSession: PropTypes.shape({
        date: PropTypes.string.isRequired,
        lastReadPage: PropTypes.number.isRequired,
        bookmark: PropTypes.string
    }).isRequired,
    onClick: PropTypes.func.isRequired
};

export default DateReadingSessionComponent;
