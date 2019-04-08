import React from 'react';
import PropTypes from 'prop-types';
import {
    Button as RNButton,
    View
} from 'react-native';
import appStyles from 'styles/AppStyles';
import appColors from 'styles/AppColors';

const Button = props => {
    const { title, onPress } = props;
    return title && (
        <View style={[appStyles.button]}>
            <RNButton color={appColors.color3}
                      onPress={onPress}
                      title={title}/>
        </View>
    );
};

Button.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
};

export default Button;