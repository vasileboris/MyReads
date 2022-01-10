import React from 'react';
import {
    useState,
    useEffect
} from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import MessageComponent from 'components/message/MessageComponent';
import BooksStatsComponent from 'components/book/BooksStatsComponent';
import { createDrawerHeaderLeft } from 'components/navigation/ScreenNavigation';
import {
    fetchBooks as fetchBooksApi
} from 'api/BookApi';
import localizer from 'utils/Localizer';
import appStyles from 'styles/AppStyles';

const StatsScreenComponent = props => {
    const [ message, setMessage ] = useState(null);
    const [books, setBooks] = useState([]);

    function fetchBooks() {
        fetchBooksApi(null)
            .then(response => setBooks(response.data))
            .catch(error => setMessage(error));
    }

    useEffect(() => {
        fetchBooks();

        const didFocusSubscription = props.navigation.addListener(
            'didFocus',
            payload => {
                setMessage(null);
                fetchBooks();
            }
        );
        return () => didFocusSubscription.remove();
    }, []);

    return (
        <View style={[appStyles.screen, appStyles.vertical, appStyles.justifyStart]}>
            <MessageComponent message={message}/>
            <BooksStatsComponent books={books}/>
        </View>
    );
}

StatsScreenComponent['navigationOptions'] = ({navigation}) => ({
    title: localizer.localize('statistics-screen'),
    headerLeft: createDrawerHeaderLeft(navigation)
})

StatsScreenComponent.propTypes = {
    message: PropTypes.string,
    books: PropTypes.object
};

export default StatsScreenComponent;
