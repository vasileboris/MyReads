import React from 'react';
import {
    View,
    Text
} from 'react-native';
import localizer from '/utils/Localizer';
import MessageComponent from '/components/message/MessageComponent';
import BookImageComponent from '/components/book/BookImageComponent';
import appStyles from '/styles/AppStyles';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLocalizerInitialized: false
        };
    }

    render() {
        const { isLocalizerInitialized } = this.state;

        return isLocalizerInitialized && (
            <View style={[appStyles.app, appStyles.vertical]}>
                <Text style={[appStyles.text]}>{localizer.localize('books-search-text')}</Text>
                <MessageComponent message="This is a message"/>
                <BookImageComponent image="https://images.manning.com/720/960/resize/book/2/8a23d37-c21c-491a-a5a9-498b6b54fe6d/Dabit-React-HI.png"/>
                <BookImageComponent/>
            </View>
        );
    }

    componentDidMount() {
        localizer.init(() => {
           this.setState({
               isLocalizerInitialized: true,
           })
        });
    }
}