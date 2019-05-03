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
import { createStackNavigator, createAppContainer } from "react-navigation";
import { library }  from 'reducers/LibraryReducer';
import localizer from 'utils/Localizer';
import BooksScreenComponent from 'components/screens/BooksScreenComponent';
import BookScreenComponent from 'components/screens/BookScreenComponent';
import CurrentReadingSessionScreen from 'components/screens/CurrentReadingSessionScreen';
import appStyles from 'styles/AppStyles';
import appColors from 'styles/AppColors';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(library, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const AppNavigator = createStackNavigator(
    {
        books: BooksScreenComponent,
        book: BookScreenComponent,
        currentReadingSession: CurrentReadingSessionScreen
    },
    {
        initialRouteName: 'books',
        defaultNavigationOptions: {
            headerStyle: appStyles.navigationBarHeaderStyle,
            headerTintColor: appColors.color3,
            headerTitleStyle: appStyles.navigationBarTitleStyle
        },
    }
);
const AppContainer = createAppContainer(AppNavigator);

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLocalizerInitialized: false
        };
    }

    render() {
        const { isLocalizerInitialized } = this.state;

        return isLocalizerInitialized && (
            <View style={[appStyles.app, appStyles.container, appStyles.vertical, appStyles.justifyStart]}>
                <Provider store={store}>
                    <AppContainer/>
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
