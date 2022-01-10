import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View
} from 'react-native';
import appStyles from 'styles/AppStyles';
import localizer from 'utils/Localizer';
import { sortBooks } from 'utils/Book';
import Card from 'components/card/Card';
import BookStatsComponent from './BookStatsComponent';

function MonthStatsComponent(props) {
    const { monthStats } = props;

    return (
        <View style={[appStyles.result, appStyles.vertical, appStyles.justifyStart]}>
            <Card style={[appStyles.marginBottom]}>
                <Text style={[appStyles.text, appStyles.emphasis, appStyles.h2]}>
                    {localizer.localize(`month-${monthStats.month}`)}
                </Text>
                <Text style={[appStyles.text]}>
                    {localizer.localizeWithCount('statistics-books-read-label', monthStats.books.length)}
                </Text>
            </Card>
            <View>
                {monthStats.books.sort(sortBooks).map(book =>
                    <Card style={[appStyles.marginBottom]} key={book.uuid}>
                        <BookStatsComponent book={book}/>
                    </Card>
                )}
            </View>
        </View>
    );
}

MonthStatsComponent.propTypes = {
    monthStats: PropTypes.object.isRequired
};

export default MonthStatsComponent;
