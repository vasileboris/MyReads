import React from 'react';
import PropTypes from 'prop-types';
import {
    LineChart as RNLineChart
} from "react-native-chart-kit";
import appSizes from 'styles/AppSizes';
import appColors from 'styles/AppColors';

const LineChart = props => {
    const { diameter, color, margin } = props;

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

    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43],
                color: (opacity = 1) => appColors.color5,
                strokeWidth: 2.5
            }
        ],
        legend: ['Read pages over time']
    };

    return (
        <RNLineChart
            data={data}
            width={appSizes.carouselWidth()}
            height={appSizes.progressCircleRadius() * 2}
            chartConfig={chartConfig}
            withVerticalLines={false}
        />
    );
};

/*
LineChart.propTypes = {
    diameter: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    margin: PropTypes.number
};
*/

export default LineChart;
