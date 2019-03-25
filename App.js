import React from 'react';
import { View } from 'react-native';
import localizer from '/utils/Localizer';
import MessageComponent from '/components/message/MessageComponent';
import appStyles from '/styles/AppStyles';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isI18nInitialized: false,
        }
    }

    render() {
        const { isI18nInitialized } = this.state;

        return isI18nInitialized && (
            <View style={appStyles.vertical}>
                <MessageComponent message="This is a custom message"/>
            </View>
        );
    }

    componentDidMount() {
        localizer.init(() => {
           this.setState({
               isI18nInitialized: true,
           })
        });
    }
}