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
import appStyles from 'styles/AppStyles';
import {
    fetchBookAction,
    changeBookFieldAction,
    addBookAction,
    updateBookAction,
    resetBookAction,
    deleteBookAction
} from 'actions/BookAction';
import { fetchCurrentReadingSessionAction } from 'actions/ReadingSessionAction';
import { clearDateReadingSessionAction } from 'actions/DateReadingSessionAction';
import { changeBookOperationAction } from 'actions/OperationAction';
import { receiveMessageAction } from 'actions/MessageAction';
import { changeDateReadingSessionOperationAction } from 'actions/OperationAction';
import { getISODate } from 'utils/Date';

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
        this.onAddButtonClick = this.onAddButtonClick.bind(this);
        this.onUpdateButtonClick = this.onUpdateButtonClick.bind(this);
        this.onConfirmDeleteDateReadingSessionClick = this.onConfirmDeleteDateReadingSessionClick.bind(this);
        this.onCancelButtonClick = this.onCancelButtonClick.bind(this);
        this.onReadButtonClick = this.onReadButtonClick.bind(this);
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
                                    onAddButtonClick={this.onAddButtonClick}
                                    onUpdateButtonClick={this.onUpdateButtonClick}
                                    onDeleteButtonClick={this.onConfirmDeleteDateReadingSessionClick}
                                    onCancelButtonClick={this.onCancelButtonClick}/>
                )}

                { 'view' === operation && book && (
                <React.Fragment>
                    <View style={[appStyles.screenSectionB1, appStyles.vertical, appStyles.justifyCenter]}>
                        <View style={[appStyles.horizontal, appStyles.justifyStart, appStyles.alignItemsCenter, appStyles.marginBottom]}>
                                <BookImageComponent image={book.image} size="smallRectangle"/>
                                <View style={[appStyles.screenSectionA2]}>
                                    <BookDetailsComponent book={book} hideReadProgress={true}/>
                                </View>
                        </View>
                        <View style={[appStyles.vertical, appStyles.justifyCenter]}>
                            <Button onPress={this.onEditButtonClick}
                                    title={localizer.localize('edit-button')}/>
                            <Button onPress={() => this.onDeleteButtonClick(book)}
                                    title={localizer.localize('delete-button')}/>
                        </View>
                    </View>
                    <View style={[appStyles.screenSectionA1, appStyles.vertical, appStyles.justifySpaceAround, appStyles.resultDetail]}>
                        <ReadingSessionProgressComponent readingSessionProgress={readingSessionProgress}/>
                        <Button onPress={this.onReadButtonClick}
                                title={localizer.localize('read-button')}/>
                    </View>
                </React.Fragment>
                )}
            </View>
        );

    }

    componentDidMount() {
        const { operation, navigation, receiveMessageAction } = this.props;
        if('add' !== operation) {
            this.retrieveBook();
            this.retrieveCurrentReadingSession();
        }
        this.willFocus = navigation.addListener('willFocus', () => {
            receiveMessageAction(null);
        });
    }

    componentWillUnmount() {
        if(this.willFocus) {
            this.willFocus.remove();
        }
    }

    retrieveBook() {
        const { book, fetchBookAction } = this.props;
        fetchBookAction(book.uuid);
    }

    retrieveCurrentReadingSession() {
        const { book, fetchCurrentReadingSessionAction } = this.props;
        fetchCurrentReadingSessionAction(book.uuid);
    }

    onReadButtonClick() {
        const {
            receiveMessageAction,
            changeDateReadingSessionOperationAction,
            clearDateReadingSessionAction,
            navigation } = this.props;

        receiveMessageAction(null);
        changeDateReadingSessionOperationAction('add');
        clearDateReadingSessionAction();
        navigation.navigate('currentReadingSession');
    }

    onEditButtonClick() {
        const { receiveMessageAction, changeBookOperationAction } = this.props;
        receiveMessageAction(null);
        changeBookOperationAction('edit');
    }

    onDeleteButtonClick() {
        const { receiveMessageAction, changeBookOperationAction } = this.props;
        receiveMessageAction(null);
        changeBookOperationAction('delete');
    }

    onBookInputChange(value, name) {
        const { changeBookFieldAction } = this.props;
        if('authors' === name) {
            value = value.split(',');
        }
        changeBookFieldAction(name, value);
    }

    onAddButtonClick() {
        const booksSearchText = this.props.booksSearchText.trim(),
            { book, addBookAction } = this.props;

        const addedBook = {
            ...book,
            date: getISODate(new Date())
        }

        addBookAction(booksSearchText, addedBook);
    }

    onUpdateButtonClick() {
        const booksSearchText = this.props.booksSearchText.trim(),
            { book, updateBookAction } = this.props;

        const updatedBook = {
            ...book,
            date: getISODate(new Date())
        }

        updateBookAction(booksSearchText, updatedBook);
    }

    onConfirmDeleteDateReadingSessionClick() {
        const booksSearchText = this.props.booksSearchText.trim(),
            { book, deleteBookAction, navigation } = this.props;

        navigation.navigate('books');
        deleteBookAction(booksSearchText, book.uuid);
    }

    onCancelButtonClick() {
        const {
            operation,
            book,
            books,
            receiveMessageAction,
            resetBookAction,
            changeBookOperationAction,
            navigation
        } = this.props;

        receiveMessageAction(null);
        if('add' === operation) {
            navigation.navigate('books');
        } else {
            changeBookOperationAction('view');
            resetBookAction(books[book.uuid]);
        }
    }
}

BookScreenComponent.propTypes = {
    operation: PropTypes.oneOf(['view', 'add', 'edit', 'delete']),
    message: PropTypes.string,
    book: PropTypes.object,
    books: PropTypes.object,
    readingSessions: PropTypes.object,
    readingSessionProgress: PropTypes.object,
    booksSearchText: PropTypes.string
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
    addBookAction,
    updateBookAction,
    resetBookAction,
    receiveMessageAction,
    deleteBookAction,
    clearDateReadingSessionAction,
    changeDateReadingSessionOperationAction
};

export default connect(mapStateToProps, mapDispatchToProps)(BookScreenComponent);
