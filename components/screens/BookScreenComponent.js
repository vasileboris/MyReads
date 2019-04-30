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
import Button from 'components/button/Button';
import Image from 'components/image/Image';
import appStyles from 'styles/AppStyles';
import { fetchBookAction } from 'actions/BookAction';
import { fetchCurrentReadingSessionAction } from 'actions/ReadingSessionAction';

class BookScreenComponent extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', localizer.localize('book-title-text'))
        };
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { operation, message, book, readingSessionsProgress } = this.props;
        const readingSessionProgress = readingSessionsProgress && readingSessionsProgress[book.uuid],
            openBook = require('../../assets/images/open-book.png');

        return (
            <View style={[appStyles.screen, appStyles.vertical, appStyles.justifySpaceBetween]}>
                <MessageComponent message={message}/>
                { 'view' === operation && book && (
                <React.Fragment>
                    <View style={[appStyles.screenSectionB1, appStyles.vertical, appStyles.justifyCenter]}>
                        <View style={[appStyles.horizontal, appStyles.justifyStart, appStyles.alignItemsCenter]}>
                            <BookImageComponent image={book.image} size="smallRectangle"/>
                            <View style={[appStyles.screenSectionA2]}>
                                <BookDetailsComponent book={book}/>
                            </View>
                        </View>
                        <View style={[appStyles.vertical, appStyles.justifyCenter]}>
                            <Button onPress={() => this.onEditClick(book)}
                                    title={localizer.localize('edit-button')}/>
                            <Button onPress={() => this.onDeleteClick(book)}
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
                        <Button onPress={() => this.onReadClick(book)}
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

    onReadClick(book) {
        console.log(book.title)
    }

    onEditClick(book) {
        console.log(book.title)
    }

    onDeleteClick(book) {
        console.log(book.title)
    }
}

BookScreenComponent.propTypes = {
    operation: PropTypes.oneOf(['view', 'add', 'edit', 'delete']),
    message: PropTypes.string,
    books: PropTypes.object,
    readingSessionProgress: PropTypes.object
};

const mapStateToProps = state => {
    const { operation, message, book, readingSessions } = state,
        { readingSessionsProgress } = readingSessions;

    return {
        operation,
        message,
        book,
        readingSessionsProgress
    };
};

const mapDispatchToProps = {
    fetchBookAction,
    fetchCurrentReadingSessionAction
};

export default connect(mapStateToProps, mapDispatchToProps)(BookScreenComponent);
