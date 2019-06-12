import React from 'react';
import {
    ScrollView
} from 'react-native';
import Markdown from 'react-native-simple-markdown';
import AssetImage from 'components/image/AssetImage';
import localizer from 'utils/Localizer';
import appStyles from '../../styles/AppStyles';

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

const content = `
#Markdown in react-native is so cool!

![Some GIF](book.png)

You can **emphasize** what you want, or just _suggest it_ 😏…

You can even [**link your website**](https://twitter.com/Charles_Mangwa) or if you prefer: [email somebody](mailto:email@somebody.com)

Spice it up with some GIFs 💃:

![Some GIF](book.png)

You can **emphasize** what you want, or just _suggest it_ 😏…

You can even [**link your website**](https://twitter.com/Charles_Mangwa) or if you prefer: [email somebody](mailto:email@somebody.com)

Spice it up with some GIFs 💃:

![Some GIF](book.png)

You can **emphasize** what you want, or just _suggest it_ 😏…

You can even [**link your website**](https://twitter.com/Charles_Mangwa) or if you prefer: [email somebody](mailto:email@somebody.com)

Spice it up with some GIFs 💃:

![Some GIF](book.png)
`;


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
