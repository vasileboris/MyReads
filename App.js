import React from 'react';
import {
    View,
    Text,
    ScrollView
} from 'react-native';
import localizer from 'utils/Localizer';
import ReadonlyBookComponent from 'components/book/ReadonlyBookComponent';
import BookComponent from 'components/book/BookComponent';
import appStyles from 'styles/AppStyles';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLocalizerInitialized: false
        };
    }

    render() {
        const { isLocalizerInitialized } = this.state;

        let book1 = {
            title: "The Power of Habit: Why We Do What We Do in Life and Business",
            authors: ["Charles Duhigg"],
            pages: 375
        };
        let book2 = {
            title: "#Workout: Games, Tools & Practices to Engage People, Improve Work, and Delight Clients (Management 3.0)",
            authors: ["Jurgen Appelo"],
            pages: 123
        };
        return isLocalizerInitialized && (
            <View style={[appStyles.app, appStyles.container, appStyles.vertical, appStyles.justifyStart]}>
                <ReadonlyBookComponent book={book1}/>
{/*
                <BookComponent book={book1}
                               onReadClick={book => console.log(book.title)}
                               onEditClick={book => console.log(book.title)}
                               onDeleteClick={book => console.log(book.title)}/>
                <ReadonlyBookComponent book={book2}/>
                <BookComponent book={{...bookRNIA, title: `${bookRNIA.title} 13`}}
                               onReadClick={book => console.log(book.title)}
                               onEditClick={book => console.log(book.title)}
                               onDeleteClick={book => console.log(book.title)}/>
*/}
            </View>
        );
    }

    componentDidMount() {
        localizer.init(() => {
           this.setState({
               isLocalizerInitialized: true,
           })
        });
    }
}
