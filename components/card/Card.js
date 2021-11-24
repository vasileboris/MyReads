import React from 'react';
import { View } from 'react-native';
import appStyles from 'styles/AppStyles';

const Card = props => {
    const { style=[] } = props;
    return (
        <View style={[...style, appStyles.card]}>
            {props.children}
        </View>
    );
};

export default Card;