import React from 'react';
import {View, Text} from 'react-native';
import localizer from '/utils/Localizer';
import MessageComponent from '/components/message/MessageComponent';
import appStyles from '/styles/AppStyles';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isI18nInitialized: false,
            inputValue: ""
        };
    }

    render() {
        const { isI18nInitialized, inputValue } = this.state;

        return isI18nInitialized && (
            <View style={appStyles.vertical}>
                <MessageComponent key={1} message="This is message 1"/>
                <MessageComponent key={2} message="This is message 2"/>
                <MessageComponent key={3} message="This is message 3"/>
                <Text style={[appStyles.text]}>{localizer.localize('books-search-text')}</Text>
                <MessageComponent key={4} message="This is message 4"/>
                <MessageComponent key={5} message="This is message 5"/>
                <MessageComponent key={6} message="This is message 6"/>
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