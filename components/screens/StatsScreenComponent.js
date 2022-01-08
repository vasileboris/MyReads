import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
} from 'react-native';
import { connect } from 'react-redux';
import MessageComponent from 'components/message/MessageComponent';
import { createDrawerHeaderLeft } from 'components/navigation/ScreenNavigation';
import { receiveMessageAction } from 'actions/MessageAction';
import { fetchBooksAction } from 'actions/BookAction';
import localizer from 'utils/Localizer';
import appStyles from 'styles/AppStyles';

class StatsScreenComponent extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: localizer.localize('statistics-screen'),
            headerLeft: createDrawerHeaderLeft(navigation)
        };
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { message, books } = this.props;

        return (
            <View style={[appStyles.screen, appStyles.vertical, appStyles.justifyStart]}>
                <MessageComponent message={message}/>
                <Text style={[appStyles.text]}>
                    {localizer.localize('statistics-screen')}
                </Text>
{/*
                <BooksComponent books={books}
                                onBookClick={this.onBookClick}/>
*/}
            </View>
        );

    }

    componentDidMount() {
        const { navigation, receiveMessageAction } = this.props;
        this.willFocus = navigation.addListener('willFocus', () => {
            receiveMessageAction(null);
        });
        this.retrieveBooks();
    }

    componentWillUnmount() {
        if(this.willFocus) {
            this.willFocus.remove();
        }
    }

    retrieveBooks() {
        const { fetchBooksAction } = this.props;
        fetchBooksAction();
    }

}

StatsScreenComponent.propTypes = {
    message: PropTypes.string,
    books: PropTypes.object
};

const mapStateToProps = state => {
    const { message, books } = state;

    return {
        message,
        books
    };
};

const mapDispatchToProps = {
    receiveMessageAction,
    fetchBooksAction
};

export default connect(mapStateToProps, mapDispatchToProps)(StatsScreenComponent);
