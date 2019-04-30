import React from 'react';
import PropTypes from 'prop-types';
import {
    View
} from 'react-native';
import { connect } from 'react-redux';
import localizer from 'utils/Localizer';
import MessageComponent from 'components/message/MessageComponent';
import BookImageComponent from 'components/book/BookImageComponent';
import BookDetailsComponent from 'components/book/BookDetailsComponent';
import ReadingSessionProgressComponent from 'components/reading-session/ReadingSessionProgressComponent';
import InputBookComponent from 'components/book/InputBookComponent';
import Button from 'components/button/Button';
import Image from 'components/image/Image';
import appStyles from 'styles/AppStyles';
import {
    fetchBookAction,
    changeBookFieldAction,
    updateBookAction,
    resetBookAction,
    deleteBookAction
} from 'actions/BookAction';
import { fetchCurrentReadingSessionAction } from 'actions/ReadingSessionAction';
import { changeBookOperationAction } from 'actions/OperationAction';
import { receiveMessageAction } from 'actions/MessageAction';

class BookScreenComponent extends React.Component {
    static navigationOptions = () => {
        return {
            title: localizer.localize('book-details-screen')
        };
    };
    constructor(props) {
        super(props);
        this.onEditButtonClick = this.onEditButtonClick.bind(this);
        this.onBookInputChange = this.onBookInputChange.bind(this);
        this.onUpdateButtonClick = this.onUpdateButtonClick.bind(this);
        this.onReallyDeleteButtonClick = this.onReallyDeleteButtonClick.bind(this);
        this.onCancelButtonClick = this.onCancelButtonClick.bind(this);
    }

    render() {
        const { operation, message, book, readingSessionsProgress } = this.props;
        const readingSessionProgress = readingSessionsProgress && readingSessionsProgress[book.uuid],
            openBook = require('../../assets/images/open-book.png');

        return (
            <View style={[appStyles.screen, appStyles.vertical, appStyles.justifyStart]}>
                <MessageComponent message={message}/>

                { 'view' !== operation && book && (
                <InputBookComponent operation={operation}
                                    book={book}
                                    onInputChange={this.onBookInputChange}
                                    onUpdateButtonClick={this.onUpdateButtonClick}
                                    onDeleteButtonClick={this.onReallyDeleteButtonClick}
                                    onCancelButtonClick={this.onCancelButtonClick}/>
                )}

                { 'view' === operation && book && (
                <React.Fragment>
                    <View style={[appStyles.screenSectionB1, appStyles.vertical, appStyles.justifyCenter]}>
                        <View style={[appStyles.horizontal, appStyles.justifyStart, appStyles.alignItemsCenter, appStyles.marginBottom]}>
                            <BookImageComponent image={book.image} size="smallRectangle"/>
                            <View style={[appStyles.screenSectionA2]}>
                                <BookDetailsComponent book={book}/>
                            </View>
                        </View>
                        <View style={[appStyles.vertical, appStyles.justifyCenter]}>
                            <Button onPress={this.onEditButtonClick}
                                    title={localizer.localize('edit-button')}/>
                            <Button onPress={() => this.onDeleteButtonClick(book)}
                                    title={localizer.localize('delete-button')}/>
                        </View>
                    </View>
                    <View style={[appStyles.screenSectionA1, appStyles.vertical, appStyles.justifyCenter, appStyles.resultDetail]}>
                        <View style={[appStyles.horizontal, appStyles.justifyStart, appStyles.alignItemsCenter]}>
                            <Image image={{source: openBook}} size="largeSquare"/>
                            <View style={[appStyles.screenSectionA2]}>
                                <ReadingSessionProgressComponent readingSessionProgress={readingSessionProgress}/>
                            </View>
                        </View>
                        <Button onPress={() => this.onReadButtonClick(book)}
                                title={localizer.localize('read-button')}/>
                    </View>
                </React.Fragment>
                )}
            </View>
        );

    }

    componentDidMount() {
        this.retrieveBook();
        this.retrieveCurrentReadingSession();
    }

    retrieveBook() {
        const { book, fetchBookAction } = this.props;
        fetchBookAction(book.uuid);
    }

    retrieveCurrentReadingSession() {
        const { book, fetchCurrentReadingSessionAction } = this.props;
        fetchCurrentReadingSessionAction(book.uuid);
    }

    onReadButtonClick(book) {
        console.log('onReadClick: ' + book.title);
        console.log(book.title)
    }

    onEditButtonClick() {
        const { changeBookOperationAction } = this.props;
        changeBookOperationAction('edit');
    }

    onDeleteButtonClick() {
        const { changeBookOperationAction } = this.props;
        changeBookOperationAction('delete');
    }

    onBookInputChange(value, name) {
        const { changeBookFieldAction } = this.props;
        if('authors' === name) {
            value = value.split(',');
        }
        changeBookFieldAction(name, value);
    }

    onUpdateButtonClick() {
        const booksSearchText = this.props.booksSearchText.trim(),
            { book, updateBookAction } = this.props;

        updateBookAction(booksSearchText, book);
    }

    onReallyDeleteButtonClick() {
        const booksSearchText = this.props.booksSearchText.trim(),
            { book, deleteBookAction, navigation } = this.props;

        navigation.navigate('books');
        deleteBookAction(booksSearchText, book.uuid);
    }

    onCancelButtonClick() {
        const { book, books, receiveMessageAction, resetBookAction, changeBookOperationAction } = this.props;
        receiveMessageAction(null);
        resetBookAction(books[book.uuid]);
        changeBookOperationAction('view');
    }
}

BookScreenComponent.propTypes = {
    operation: PropTypes.oneOf(['view', 'add', 'edit', 'delete']),
    message: PropTypes.string,
    books: PropTypes.object,
    readingSessionProgress: PropTypes.object
};

const mapStateToProps = state => {
    const { operation, message, book, books, readingSessions, booksSearchText } = state,
        { readingSessionsProgress } = readingSessions;

    return {
        operation,
        message,
        book,
        books,
        booksSearchText,
        readingSessionsProgress,
    };
};

const mapDispatchToProps = {
    fetchBookAction,
    fetchCurrentReadingSessionAction,
    changeBookOperationAction,
    changeBookFieldAction,
    updateBookAction,
    resetBookAction,
    receiveMessageAction,
    deleteBookAction
};

export default connect(mapStateToProps, mapDispatchToProps)(BookScreenComponent);
