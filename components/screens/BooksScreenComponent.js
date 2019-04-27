import React from 'react';
import PropTypes from 'prop-types';
import {
    View
} from 'react-native';
import { connect } from 'react-redux';
import MessageComponent from 'components/message/MessageComponent';
import BooksComponent from 'components/book/BooksComponent';
import SearchBooksComponent from 'components/book/SearchBooksComponent';
import appStyles from 'styles/AppStyles';
import { receiveMessageAction } from 'actions/MessageAction';
import { receiveBooksSearchTextAction } from 'actions/BooksSearchAction';
import { fetchBooksAction } from 'actions/BookAction';

class BooksScreenComponent extends React.Component {
    static navigationOptions = {
        title: 'My Reads'
    };

    constructor(props) {
        super(props);
        this.onSearchInputChange = this.onSearchInputChange.bind(this);
    }

    render() {
        const { message, books, navigation } = this.props;

        return (
            <View style={[appStyles.screen, appStyles.vertical, appStyles.justifyStart]}>
                <MessageComponent message={message}/>
                <SearchBooksComponent
                    onInputChange={this.onSearchInputChange}
                    onAddClick={() => console.log('on add click')}/>
                <BooksComponent books={books}
                                onBookClick={book => navigation.navigate('Book', { bookUuid: book.uuid, bookTitle: book.title })}/>
            </View>
        );

    }

    componentDidMount() {
        const { navigation, receiveMessageAction } = this.props;
        this.willFocus = navigation.addListener('willFocus', () => receiveMessageAction(null));
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

    onSearchInputChange(text) {
        const booksSearchText = text,
            { receiveBooksSearchTextAction, fetchBooksAction } = this.props;
        receiveBooksSearchTextAction(booksSearchText);
        fetchBooksAction(booksSearchText.trim());
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
    fetchBooksAction
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksScreenComponent);
