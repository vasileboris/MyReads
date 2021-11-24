import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    ScrollView
} from 'react-native';
import ProgressCircle from 'components/charts/ProgressCircle';
import LineChart from 'components/charts/LineChart';
import Card from '/components/card/Card';
import localizer from 'utils/Localizer';
import appStyles from 'styles/AppStyles';
import appSizes from 'styles/AppSizes';
import { addDays } from 'utils/Date';

function ReadingSessionProgressComponent (props) {
    const  { readingSessionProgress } = props;
    if(!readingSessionProgress) {
        return (
            <View style={[appStyles.vertical, appStyles.justifyEnd, appStyles.alignItemsCenter]}>
                <Text style={[appStyles.text, appStyles.title]}>
                    {localizer.localize('reading-session-progress-none')}
                </Text>
            </View>
        );
    }

    return (
        <View style={[appStyles.vertical, appStyles.justifyCenter]} height={appSizes.carouselHeight()}>
            <ScrollView>
                <Card>
                    <View style={[appStyles.horizontal, appStyles.justifyCenter]}>
                        <ProgressCircle
                            readingSessionProgress={readingSessionProgress}
                            radius={appSizes.progressCircleRadius()}
                            borderWidth={appSizes.progressCircleBorder()}
                        />
                    </View>
                </Card>
                <Card style={[appStyles.marginTop]}>
                    <View style={[appStyles.horizontal, appStyles.justifyCenter]}>
                        <View style={[appStyles.vertical, appStyles.justifySpaceBetween]}>
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
                </Card>
                <Card style={[appStyles.marginTop]}>
                    <LineChart
                        data={buildPagesReadOverTime(readingSessionProgress)}
                        width={appSizes.lineChartWidth()}
                        height={appSizes.lineChartHeight()}
                    />
                </Card>
            </ScrollView>
        </View>
    );
}

function buildPagesReadOverTime(readingSessionProgress) {
    const { dateReadingSessions,
        estimatedReadDaysLeft,
        estimatedDaysLeft,
        estimatedFinishDate,
        lastReadPage,
        averagePagesPerDay,
        pagesTotal } = readingSessionProgress;

    dateReadingSessions.sort((drs1, drs2) => drs1.date.localeCompare(drs2.date));
    const lastReadIndex = dateReadingSessions.length - 1;

    if(estimatedReadDaysLeft > 0) {
        const lastReadingSessionDate = dateReadingSessions[dateReadingSessions.length - 1].date;
        const multiplyFactor = Math.round(estimatedDaysLeft / estimatedReadDaysLeft);
        for(let i=0; i<estimatedReadDaysLeft-1; i++) {
            dateReadingSessions.push({
                date: addDays(lastReadingSessionDate, (i+1) * multiplyFactor),
                lastReadPage: lastReadPage + (i+1) * averagePagesPerDay
            });
        }
        dateReadingSessions.push({
            date: estimatedFinishDate,
            lastReadPage: pagesTotal
        });
    }
    const pagesReadOverTime = {
        labels: dateReadingSessions.map(drs => drs.date),
        values: dateReadingSessions.map(drs => drs.lastReadPage),
        seriesOneLastIndex: lastReadIndex,
        legend: [localizer.localize('read-pages-over-time-label')]
    };
    return pagesReadOverTime;
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
