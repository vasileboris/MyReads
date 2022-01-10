import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';
import MessageComponent from 'components/message/MessageComponent';
import BooksStatsComponent from 'components/book/BooksStatsComponent';
import { createDrawerHeaderLeft } from 'components/navigation/ScreenNavigation';
import { receiveMessageAction } from 'actions/MessageAction';
import {
    fetchBooksAction,
    updateBooksStatsAction
} from 'actions/BookAction';
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
                <BooksStatsComponent books={books}/>
            </View>
        );

    }

    componentDidMount() {
        const { navigation, receiveMessageAction } = this.props;
        this.willFocus = navigation.addListener('willFocus', () => {
            receiveMessageAction(null);
        });
        this.updateBooksStats();
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

    updateBooksStats() {
        const { updateBooksStatsAction } = this.props;
        updateBooksStatsAction();
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
    fetchBooksAction,
    updateBooksStatsAction
};

export default connect(mapStateToProps, mapDispatchToProps)(StatsScreenComponent);
