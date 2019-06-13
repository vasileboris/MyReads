import React from 'react';
import {
    ScrollView
} from 'react-native';
import Markdown from 'react-native-simple-markdown';
import AssetImage from 'components/image/AssetImage';
import localizer from 'utils/Localizer';
import appStyles from 'styles/AppStyles';
import { content } from 'assets/help/HelpContent';

const rules={
    image: {
        react: (node, output, state) => (
            <AssetImage
                key={state.key}
                folder='help'
                image={node.target}
                size='large'
            />
        ),
    },
};

class HelpScreen extends React.Component {
    static navigationOptions = () => {
        return {
            title: localizer.localize('help-screen')
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

export default HelpScreen;
