import React from 'react';
import {
    ScrollView,
} from 'react-native';
import Markdown from 'react-native-simple-markdown';
import AssetImage from 'components/image/AssetImage';
import { createDrawerHeaderLeft } from 'components/navigation/ScreenNavigation';
import localizer from 'utils/Localizer';
import appStyles from 'styles/AppStyles';
import markdownStyles from 'styles/MarkdownStyles';
import { content } from 'assets/privacy/PrivacyPolicy';

const rules={
    image: {
        react: (node, output, state) => (
            <AssetImage
                key={state.key}
                folder='privacy'
                image={node.target}
                size='original'
            />
        ),
    },
};

class PrivacyPolicyScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: localizer.localize('privacy-policy-screen'),
            headerLeft: createDrawerHeaderLeft(navigation)
        };
    };

    render() {
       return (
            <ScrollView style={[appStyles.screen]}>
                <Markdown styles={markdownStyles} rules={rules}>{content}</Markdown>
            </ScrollView>
        );
    }
};

export default PrivacyPolicyScreen;
