import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import appStyles from 'styles/AppStyles';
import localizer from '/utils/Localizer';
import BookStatsComponent from './BookStatsComponent';

function MonthStatsComponent(props) {
    const { monthStats } = props;

    return (
        <View style={[appStyles.result, appStyles.vertical, appStyles.justifyStart, appStyles.marginTop]}>
            <Text style={[appStyles.text, appStyles.emphasis, appStyles.h2]}>
                {monthStats.month}
            </Text>
            <Text style={[appStyles.text]}>
                {localizer.localizeWithCount('statistics-books-read-label', monthStats.books.length)}
            </Text>
            <View style={[appStyles.resultDetail]}>
                {monthStats.books.map(book =>
                    <BookStatsComponent book={book}/>
                )}
            </View>
        </View>
    );
}

MonthStatsComponent.propTypes = {
    monthStats: PropTypes.object.isRequired
};

export default MonthStatsComponent;
