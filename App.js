import React from 'react';
import {
    View,
    Text,
    ScrollView
} from 'react-native';
import localizer from '/utils/Localizer';
import MessageComponent from '/components/message/MessageComponent';
import ReadonlyBookComponent from '/components/book/ReadonlyBookComponent';
import BookComponent from '/components/book/BookComponent';
import appStyles from '/styles/AppStyles';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLocalizerInitialized: false
        };
    }

    render() {
        const { isLocalizerInitialized } = this.state;

        let bookRNIA = {
            title: "React Native In Action",
            image: "https://images.manning.com/720/960/resize/book/2/8a23d37-c21c-491a-a5a9-498b6b54fe6d/Dabit-React-HI.png",
            authors: ["Sir John Whitmore"],
            pages: 335
        };
        return isLocalizerInitialized && (
            <View style={[appStyles.app, appStyles.horizontal]}>
                <BookComponent book={{...bookRNIA, title: `${bookRNIA.title} 1`}}
                               onReadClick={book => console.log(book.title)}
                               onEditClick={book => console.log(book.title)}
                               onDeleteClick={book => console.log(book.title)}/>
                <ReadonlyBookComponent book={{...bookRNIA, title: `${bookRNIA.title} 2`}}/>

                <ReadonlyBookComponent book={{...bookRNIA, title: `${bookRNIA.title} 3`}}/>
                <BookComponent book={{...bookRNIA, title: `${bookRNIA.title} 4`}}
                               onReadClick={book => console.log(book.title)}
                               onEditClick={book => console.log(book.title)}
                               onDeleteClick={book => console.log(book.title)}/>

                <ReadonlyBookComponent book={{...bookRNIA, title: `${bookRNIA.title} 5`}}/>
                <BookComponent book={{...bookRNIA, title: `${bookRNIA.title} 6`}}
                               onReadClick={book => console.log(book.title)}
                               onEditClick={book => console.log(book.title)}
                               onDeleteClick={book => console.log(book.title)}/>
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