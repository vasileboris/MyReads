import React from 'react';
import {
    ScrollView,
} from 'react-native';
import Markdown from 'react-native-simple-markdown';
import AssetImage from 'components/image/AssetImage';
import { createDrawerHeaderLeft } from 'components/navigation/AppNavigation';
import localizer from 'utils/Localizer';
import appStyles from 'styles/AppStyles';
import { content } from 'assets/about/AboutContent';

const rules={
    image: {
        react: (node, output, state) => (
            <AssetImage
                key={state.key}
                folder='about'
                image={node.target}
                size='largeRectangle'
            />
        ),
    },
};

class AboutScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: localizer.localize('about-screen'),
            headerLeft: createDrawerHeaderLeft(navigation)
        };
    };

    render() {
        return (
            <ScrollView style={[appStyles.screen]}>
                <Markdown rules={rules}>{content}</Markdown>
            </ScrollView>
        );
    }
};

export default AboutScreen;
