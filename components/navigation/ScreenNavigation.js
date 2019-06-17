import React from 'react';
import {
    TouchableOpacity,
    View
} from 'react-native';
import AssetImage from 'components/image/AssetImage';

export const createDrawerHeaderLeft = (navigation) => (
    <TouchableOpacity
        onPress={() => navigation.openDrawer()}>
        <View style={{marginLeft: 18}}>
            <AssetImage
                key='menu.png'
                folder='menu'
                image='menu.png'
                size='menu'
            />
        </View>
    </TouchableOpacity>
);
