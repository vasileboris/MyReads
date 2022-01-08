import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import appStyles from 'styles/AppStyles';
import localizer from '../../utils/Localizer';
import MonthStatsComponent from './MonthStatsComponent';
import Card from 'components/card/Card';

function YearStatsComponent(props) {
    const { yearStats } = props;

    const sortedMonths = Object.keys(yearStats.months)
        .filter(key => 'length' !== key)
        .sort((m1, m2) => m2.localeCompare(m1));
    let sortedStats = [];
    sortedMonths.forEach(month => {
        sortedStats = [
            ...sortedStats,
            {
                month,
                books: yearStats.months[month]
            }
        ]
    });

    return (
        <View style={[appStyles.result, appStyles.vertical, appStyles.justifyStart]}>
            <Card style={[appStyles.marginBottom]}>
                <Text style={[appStyles.text, appStyles.emphasis, appStyles.h1]}>
                    {yearStats.year}
                </Text>
                <Text style={[appStyles.text]}>
                    {localizer.localizeWithCount('statistics-books-read-label', yearStats.months.length)}
                </Text>
            </Card>
            {sortedStats.map(stats =>
                <MonthStatsComponent monthStats={stats}/>
            )}
        </View>
    );
}

YearStatsComponent.propTypes = {
    yearStats: PropTypes.object.isRequired
};

export default YearStatsComponent;
