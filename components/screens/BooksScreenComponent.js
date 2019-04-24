import React from 'react';
import PropTypes from 'prop-types';
import {
    View
} from 'react-native';
import { connect } from 'react-redux';
import MessageComponent from 'components/message/MessageComponent';
import BooksComponent from 'components/book/BooksComponent';
import appStyles from 'styles/AppStyles';
import { fetchBooksAction } from 'actions/BookAction';

class BooksScreenComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { message, books } = this.props;

        return (
            <View style={[appStyles.vertical, appStyles.justifyStart]}>
                <MessageComponent message={message}/>
                <BooksComponent books={books} onBookClick={book => console.log(`Clicked on ${book.title}`)}/>
            </View>
        );

    }

    componentDidMount() {
       this.retrieveBooks();
    }

    retrieveBooks() {
        const { fetchBooksAction } = this.props;
        fetchBooksAction();
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
    fetchBooksAction
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksScreenComponent);
