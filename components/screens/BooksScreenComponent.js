import React from 'react';
import PropTypes from 'prop-types';
import {
    View
} from 'react-native';
import { connect } from 'react-redux';
import MessageComponent from 'components/message/MessageComponent';
import BooksComponent from 'components/book/BooksComponent';
import SearchBooksComponent from 'components/book/SearchBooksComponent';
import { createDrawerHeaderLeft } from 'components/navigation/ScreenNavigation';
import { receiveMessageAction } from 'actions/MessageAction';
import { receiveBooksSearchTextAction } from 'actions/BooksSearchAction';
import {
    fetchBooksAction,
    resetBookAction,
    updateBooksStatsAction
} from 'actions/BookAction';
import { changeBookOperationAction } from 'actions/OperationAction';
import localizer from 'utils/Localizer';
import appStyles from 'styles/AppStyles';

class BooksScreenComponent extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: localizer.localize('app-title'),
            headerLeft: createDrawerHeaderLeft(navigation)
        };
    };

    constructor(props) {
        super(props);
        this.onSearchInputChange = this.onSearchInputChange.bind(this);
        this.onBookClick = this.onBookClick.bind(this);
        this.onAddBookClick = this.onAddBookClick.bind(this);
    }

    render() {
        const { message, books } = this.props;

        return (
            <View style={[appStyles.screen, appStyles.vertical, appStyles.justifyStart]}>
                <MessageComponent message={message}/>
                <SearchBooksComponent
                    onInputChange={this.onSearchInputChange}
                    onAddClick={this.onAddBookClick}/>
                <BooksComponent books={books}
                                onBookClick={this.onBookClick}/>
            </View>
        );

    }

    componentDidMount() {
        const { navigation, receiveMessageAction } = this.props;
        this.willFocus = navigation.addListener('willFocus', () => {
            receiveMessageAction(null);
        });
        this.retrieveBooks();
        this.updateBooksStats();
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
    onSearchInputChange(text) {
        const booksSearchText = text,
            { receiveBooksSearchTextAction, fetchBooksAction } = this.props;
        receiveBooksSearchTextAction(booksSearchText);
        fetchBooksAction(booksSearchText.trim());
    }

    onBookClick(book) {
        const { receiveMessageAction, changeBookOperationAction, resetBookAction, navigation } = this.props;
        receiveMessageAction(null);
        changeBookOperationAction('view');
        resetBookAction(book);
        navigation.navigate('book');
    }

    onAddBookClick() {
        const { receiveMessageAction, changeBookOperationAction, resetBookAction, navigation } = this.props;
        receiveMessageAction(null);
        changeBookOperationAction('add');
        resetBookAction({});
        navigation.navigate('book');
    }
}

BooksScreenComponent.propTypes = {
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
    receiveBooksSearchTextAction,
    fetchBooksAction,
    resetBookAction,
    changeBookOperationAction,
    updateBooksStatsAction
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksScreenComponent);
