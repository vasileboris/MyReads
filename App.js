import React from 'react';
import {
    createStore,
    applyMiddleware
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'sagas/RootSagas';
import {
    View
} from 'react-native';
import { Provider } from 'react-redux';
import { library }  from 'reducers/LibraryReducer';
import localizer from 'utils/Localizer';
import BooksScreenComponent from 'components/screens/BooksScreenComponent';
import BookScreenComponent from 'components/screens/BookScreenComponent';
import appStyles from 'styles/AppStyles';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(library, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLocalizerInitialized: false
        };
    }

    render() {
        const { isLocalizerInitialized } = this.state;

        const books = {};
        for(let i=1; i<11; i++ ) {
            const book = {
                uuid: `uuid-${i}`,
                title: `Book ${i}`,
                authors: [`Author ${i}`],
                pages: i
            };
            books[book.uuid] = book;
        }

        return isLocalizerInitialized && (
            <View style={[appStyles.app, appStyles.container, appStyles.vertical, appStyles.justifyStart]}>
                <Provider store={store}>

                    <BooksScreenComponent/>

{/*
                    <BookScreenComponent bookUuid={'77b57545-41f1-40e0-845b-d2fc45f15644'}/>
*/}
                </Provider>
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

export default App;
