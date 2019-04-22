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
import BookPageComponent from 'components/book/BookPageComponent';
import appStyles from 'styles/AppStyles';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLocalizerInitialized: false
        };

        const sagaMiddleware = createSagaMiddleware();
        this.store = createStore(library, applyMiddleware(sagaMiddleware));
        sagaMiddleware.run(rootSaga);
    }

    render() {
        const { isLocalizerInitialized } = this.state;

        let book1 = {
            title: "The Power of Habit: Why We Do What We Do in Life and Business",
            authors: ["Charles Duhigg"],
            image: "https://images-na.ssl-images-amazon.com/images/I/517FwF49v%2BL._SX322_BO1,204,203,200_.jpg",
            pages: 375
        };
        let book2 = {
            title: "#Workout: Games, Tools & Practices to Engage People, Improve Work, and Delight Clients (Management 3.0)",
            authors: ["Jurgen Appelo"],
            pages: 123
        };

        let book1ReadingSessionProgress = {
            bookUuid: 'c83446f8-6648-4dc2-b78b-889586c139b8',
            lastReadPage: 138,
            pagesTotal: 375,
            readPercentage: 35,
            averagePagesPerDay: 17,
            estimatedReadDaysLeft: 15,
            estimatedDaysLeft: 90,
            estimatedFinishDate: '2019-07-15',
            deadline: null
        };

        return isLocalizerInitialized && (
            <View style={[appStyles.app, appStyles.container, appStyles.vertical, appStyles.justifyStart]}>
                <Provider store={this.store}>
                    <BookPageComponent bookUuid={'949c149c-daa3-4b20-a3ce-208c184c593d'}/>
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
