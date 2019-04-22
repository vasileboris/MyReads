import React from 'react';
import PropTypes from 'prop-types';
import {
    View
} from 'react-native';
import { connect } from 'react-redux';
import localizer from 'utils/Localizer';
import MessageComponent from 'components/message/MessageComponent';
import BookImageComponent from './BookImageComponent';
import BookDetailsComponent from './BookDetailsComponent';
import ReadingSessionProgressComponent from 'components/reading-session/ReadingSessionProgressComponent';
import Button from 'components/button/Button';
import Image from 'components/image/Image';
import appStyles from 'styles/AppStyles';
import appColors from 'styles/AppColors';
import { fetchBookAction } from 'actions/BookAction';
import { fetchCurrentReadingSessionAction } from 'actions/ReadingSessionAction';

class BookPageComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { bookUuid, message, books, readingSessionsProgress, onReadClick, onEditClick, onDeleteClick} = this.props;
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
                                onPress={() => onReadClick(book)}
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
                                    onPress={() => onEditClick(book)}
                                    title={localizer.localize('edit-button')}/>
                            <Button style={[appStyles.button]}
                                    color={appColors.color3}
                                    onPress={() => onDeleteClick(book)}
                                    title={localizer.localize('delete-button')}/>
                        </View>
                    </View>
                </React.Fragment>
                )}
            </View>
        );

    }

    componentDidMount() {
       // this.retrieveBook();
        //this.retrieveCurrentReadingSession();
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

BookPageComponent.propTypes = {
    bookUuid: PropTypes.string.isRequired,
    message: PropTypes.string,
    books: PropTypes.arrayOf(PropTypes.shape({
        isbn10: PropTypes.string,
        isbn13: PropTypes.string,
        image: PropTypes.string,
        title: PropTypes.string.isRequired,
        authors: PropTypes.arrayOf(PropTypes.string).isRequired,
        pages: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]).isRequired,
    })),
    readingSessionProgress: PropTypes.arrayOf(PropTypes.shape({
        readPercentage: PropTypes.number.isRequired,
        averagePagesPerDay: PropTypes.number.isRequired,
        pagesTotal: PropTypes.number.isRequired,
        lastReadPage: PropTypes.number.isRequired,
        estimatedReadDaysLeft: PropTypes.number.isRequired,
        estimatedDaysLeft: PropTypes.number.isRequired,
        estimatedFinishDate: PropTypes.string.isRequired,
        deadline: PropTypes.string
    }))
};

const mapStateToProps = state => {
    const { message, books, readingSessions } = state;
    return {
        message,
        books,
        readingSessionsProgress:  { readingSessions }
    };
};

const mapDispatchToProps = {
    fetchBookAction,
    fetchCurrentReadingSessionAction
};

//export default BookPageComponent;
export default connect(mapStateToProps, mapDispatchToProps)(BookPageComponent);
