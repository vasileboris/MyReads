import React from 'react';
import PropTypes from 'prop-types';
import {
    FlatList
} from 'react-native';
import DateReadingSessionComponent from './DateReadingSessionComponent';
import appStyles from 'styles/AppStyles';

function DateReadingSessionsComponent(props) {
    const { dateReadingSessions, onDateReadingSessionClick } = props;
    return (
        <FlatList style={[appStyles.resultDetail]}
            data={dateReadingSessions.sort((drs1, drs2) => drs2.date.localeCompare(drs1.date))}
            keyExtractor={drs => drs.date}
            renderItem={ ({item}) => (
                <DateReadingSessionComponent dateReadingSession={item} onClick={onDateReadingSessionClick}/>
            )}
        />
    );
}

DateReadingSessionsComponent.propTypes = {
    dateReadingSessions: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.string.isRequired,
            lastReadPage: PropTypes.number.isRequired,
            bookmark: PropTypes.string
        })
    ).isRequired,
    onDateReadingSessionClick: PropTypes.func.isRequired
};

export default DateReadingSessionsComponent;
