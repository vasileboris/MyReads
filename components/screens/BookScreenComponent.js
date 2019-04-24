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
import appColors from 'styles/AppColors';
import { fetchBookAction } from 'actions/BookAction';
import { fetchCurrentReadingSessionAction } from 'actions/ReadingSessionAction';

class BookScreenComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { bookUuid, message, books, readingSessionsProgress } = this.props;
        const book = books && books[bookUuid],
            readingSessionProgress = readingSessionsProgress && readingSessionsProgress[bookUuid];

        if(!book && !message) {
            //Add a loading mechanism
            return null;
        }

        const openBook = require('../../assets/images/open-book.png');
        return (
            <View style={[appStyles.resultSingle, appStyles.vertical, appStyles.justifySpaceBetween]}>
                <MessageComponent message={message}/>
                { book && (
                <React.Fragment>
                    <View style={[appStyles.resultSingleSectionB1, appStyles.vertical, appStyles.justifyCenter]}>
                        <View style={[appStyles.horizontal, appStyles.justifyStart, appStyles.alignItemsCenter]}>
                            <Image image={{source: openBook}} size="largeSquare"/>
                            <View style={[appStyles.resultSingleSectionA2]}>
                                <ReadingSessionProgressComponent readingSessionProgress={readingSessionProgress}/>
                            </View>
                        </View>
                        <Button style={[appStyles.button]}
                                color={appColors.color3}
                                onPress={() => this.onReadClick(book)}
                                title={localizer.localize('read-button')}/>
                    </View>
                    <View
                        style={[appStyles.resultDetail, appStyles.resultSingleSectionA1, appStyles.vertical, appStyles.justifyCenter]}>
                        <View style={[appStyles.horizontal, appStyles.justifyStart, appStyles.alignItemsCenter]}>
                            <BookImageComponent image={book.image} size="largeRectangle"/>
                            <View style={[appStyles.resultSingleSectionA2]}>
                                <BookDetailsComponent book={book}/>
                            </View>
                        </View>
                        <View style={[appStyles.vertical, appStyles.justifyCenter]}>
                            <Button style={[appStyles.button]}
                                    color={appColors.color3}
                                    onPress={() => this.onEditClick(book)}
                                    title={localizer.localize('edit-button')}/>
                            <Button style={[appStyles.button]}
                                    color={appColors.color3}
                                    onPress={() => this.onDeleteClick(book)}
                                    title={localizer.localize('delete-button')}/>
                        </View>
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
        const { fetchBookAction, bookUuid } = this.props;
        fetchBookAction(bookUuid);
    }

    retrieveCurrentReadingSession() {
        const { fetchCurrentReadingSessionAction, bookUuid } = this.props;
        fetchCurrentReadingSessionAction(bookUuid);
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
    bookUuid: PropTypes.string.isRequired,
    message: PropTypes.string,
    books: PropTypes.object,
    readingSessionProgress: PropTypes.object
};

const mapStateToProps = state => {
    const { message, books, readingSessions } = state,
        { readingSessionsProgress } = readingSessions;

    return {
        message,
        books,
        readingSessionsProgress
    };
};

const mapDispatchToProps = {
    fetchBookAction,
    fetchCurrentReadingSessionAction
};

export default connect(mapStateToProps, mapDispatchToProps)(BookScreenComponent);
