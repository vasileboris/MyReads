import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text
} from 'react-native';
import localizer from 'utils/Localizer';
import appStyles from 'styles/AppStyles';
import ProgressBar from 'components/charts/ProgressBar';
import { getBookDate } from 'utils/Book';

function BookDetailsComponent(props) {
    const { book, hideReadProgress } = props;
    return (
        <View style={[appStyles.vertical, appStyles.justifyCenter]}>
            <Text style={[appStyles.text, appStyles.title]}>
                {book.title}
            </Text>
            <Text style={[appStyles.text]}>
                {localizer.localize('book-by-label')} {book.authors.join(', ')}
            </Text>
            <Text style={[appStyles.text]}>
                {localizer.localizeWithCount('book-page-label', parseInt(book.pages))}
            </Text>
            {!hideReadProgress && book.readPercentage && (
                <React.Fragment>
                    <Text>
                        <Text style={[appStyles.text, appStyles.emphasis]}>
                            {book.readPercentage}%
                        </Text>
                        <Text style={[appStyles.text]}>
                            {' '}
                        </Text>
                        <Text style={[appStyles.text]}>
                            {localizer.localize('reading-session-progress-status-label')}
                        </Text>
                    </Text>
                    <ProgressBar value={book.readPercentage}/>
                </React.Fragment>
            )}
            {'1970-01-01' !== getBookDate(book) && (
                <Text>
                    <Text style={[appStyles.text]}>
                        {localizer.localize('book-last-update-label')}
                    </Text>
                    <Text style={[appStyles.text]}>
                        {' '}
                    </Text>
                    <Text style={[appStyles.text, appStyles.title]}>
                        {localizer.toLocaleDateString(getBookDate(book))}
                    </Text>
                </Text>
            )}
        </View>
    );
}

BookDetailsComponent.propTypes = {
    book: PropTypes.shape({
        isbn10: PropTypes.string,
        isbn13: PropTypes.string,
        image: PropTypes.string,
        title: PropTypes.string.isRequired,
        authors: PropTypes.arrayOf(PropTypes.string).isRequired,
        pages: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]).isRequired,
    }).isRequired,
    hideReadProgress: PropTypes.bool
};

export default BookDetailsComponent;
