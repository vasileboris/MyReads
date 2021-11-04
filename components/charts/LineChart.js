import React from 'react';
import PropTypes from 'prop-types';
import {
    LineChart as RNLineChart
} from "react-native-chart-kit";
import appColors from 'styles/AppColors';

const LineChart = props => {
    const { width, height, data } = props;

    const chartConfig = {
        backgroundGradientFrom: appColors.color2,
        backgroundGradientTo: appColors.color2,
        decimalPlaces: 0,
        color: (opacity = 1) => 'black',
        labelColor: (opacity = 1) => appColors.color3,
        propsForDots: {
            r: 5,
            strokeWidth: 2.5,
            stroke: appColors.color4
        }
    };

    const defaultData = {
        labels: [],
        datasets: [
            {
                data: [],
                color: (opacity = 1) => appColors.color5,
                strokeWidth: 2.5
            }
        ],
        legend: []
    };

    const { labels } = data;
    const mergedLabels = labels.length > 3
        ? [labels[0], labels[Math.floor((labels.length-1)/2)], labels[labels.length-1]]
        : labels;
    const mergedData = {
        labels: mergedLabels,
        datasets: [
            {
                ...defaultData.datasets[0],
                data: data.values
            }
        ],
        legend: data.legend
    }

    return (
        <RNLineChart
            data={mergedData}
            width={width}
            height={height}
            chartConfig={chartConfig}
            withVerticalLines={false}
        />
    );
};

LineChart.propTypes = {
    data: PropTypes.object.isRequired,
    diameter: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    margin: PropTypes.number
};

export default LineChart;
