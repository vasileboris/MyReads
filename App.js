import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import i18next from 'i18next';
import Fetch from 'i18next-fetch-backend';
import PROP from '/utils/PROP';
import localizer from '/utils/Localizer';
import { fetchBooks } from '/api/BookApi';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isI18nInitialized: false,
            books: []
        }
    }

    render() {
        const { isI18nInitialized, books } = this.state;

        if(!isI18nInitialized) {
            return null;
        }
        return (
            <View style={styles.container}>
                <Text>{localizer.localize('books-search-text')}</Text>
                {books.map( book => (<Text>{book.title}</Text>))}
            </View>
        );
    }

    componentDidMount() {
        i18next
            .use(Fetch)
            .init({
                backend: {
                    loadPath: lng => {
                        const suffix = 'en' !== lng ? `_${lng}` : '';
                        return `http://192.168.0.87:81/translations/Messages${suffix}.properties`
                    },
                    parse: data => PROP.parse(data)
                },
                lng: "en",
                fallbackLng: "en",
                interpolation: {
                    prefix: "{",
                    suffix: "}"
                },
                debug: true
            }, () => {
                fetchBooks().then((response) => {
                   this.setState({
                       isI18nInitialized: true,
                       books: response.data
                   })
                });
            });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
