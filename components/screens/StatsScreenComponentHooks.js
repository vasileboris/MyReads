import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';
import MessageComponent from 'components/message/MessageComponent';
import BooksStatsComponent from 'components/book/BooksStatsComponent';
import { createDrawerHeaderLeft } from 'components/navigation/ScreenNavigation';
import { receiveMessageAction } from 'actions/MessageAction';
import { fetchBooksAction } from 'actions/BookAction';
import localizer from 'utils/Localizer';
import appStyles from 'styles/AppStyles';

const StatsScreenComponent = props => {

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

StatsScreenComponent['navigationOptions'] = ({navigation}) => ({
    title: localizer.localize('statistics-screen'),
    headerLeft: createDrawerHeaderLeft(navigation)
})

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
