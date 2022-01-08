import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import YearStatsComponent from '/components/book/YearStatsComponent';
import Card from '/components/card/Card';
import appStyles from 'styles/AppStyles';

function BooksStatsComponent(props) {
    const { books } = props;

    const booksRead = Object.values(books).filter(book => book.lastReadPageDate && 100 === book.readPercentage);
    let statsBooks = {};
    booksRead.forEach(book => {
        const [year, month] = book.lastReadPageDate.split('-');
        statsBooks = {
            ...statsBooks,
            [year]: {
                ...(statsBooks[year] && statsBooks[year] ? statsBooks[year] : []),
                [month]: [
                    ...(statsBooks[year] && statsBooks[year][month] ? statsBooks[year][month] : []),
                    book
                ]
            }
        }
    });

    Object.keys(statsBooks).forEach(year => {
        let length = 0;
        Object.values(statsBooks[year]).forEach(bookMonth => {
            length += bookMonth.length;
        })
       statsBooks[year].length = length;
    });

    const sortedYears = Object.keys(statsBooks).sort((y1, y2) => y2.localeCompare(y1));
    let sortedStats = [];
    sortedYears.forEach(year => {
        sortedStats = [
            ...sortedStats,
            {
                year,
                months: statsBooks[year]
            }
        ]
    });

    return (
        <FlatList
            data={sortedStats}
            keyExtractor={stats => stats.year}
            renderItem={({item}) => (
                <YearStatsComponent yearStats={item} key={item.year}/>
            )}
        />
    );
}

BooksStatsComponent.propTypes = {
    books: PropTypes.object.isRequired
};

export default BooksStatsComponent;
