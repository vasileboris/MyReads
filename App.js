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
import { createStackNavigator, createDrawerNavigator, createAppContainer } from "react-navigation";
import { library }  from 'reducers/LibraryReducer';
import localizer from 'utils/Localizer';
import BooksScreenComponent from 'components/screens/BooksScreenComponent';
import BookScreenComponent from 'components/screens/BookScreenComponent';
import CurrentReadingSessionScreen from 'components/screens/CurrentReadingSessionScreen';
import HelpScreen from 'components/screens/HelpScreen';
import AboutScreen from 'components/screens/AboutScreen';
import appStyles from 'styles/AppStyles';
import appColors from 'styles/AppColors';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(library, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const defaultNavigationOptions = {
    headerStyle: appStyles.navigationBarHeaderStyle,
    headerTintColor: appColors.color3,
    headerTitleStyle: appStyles.navigationBarTitleStyle
};

const BooksStackNavigator = createStackNavigator(
    {
        books: BooksScreenComponent,
        book: BookScreenComponent,
        currentReadingSession: CurrentReadingSessionScreen
    },
    {
        initialRouteName: 'books',
        defaultNavigationOptions
    }
);

const HelpStackNavigator = createStackNavigator(
    {
        help: HelpScreen
    },
    {
        initialRouteName: 'help',
        defaultNavigationOptions
    }
);

const AboutStackNavigator = createStackNavigator(
    {
        about: AboutScreen
    },
    {
        initialRouteName: 'about',
        defaultNavigationOptions
    }
);

const AppNavigator = createDrawerNavigator(
    {
        stackNavigator: {
            screen: BooksStackNavigator,
            navigationOptions: {
                drawerLabel: 'Books'
            }
        },
        help: {
            screen: HelpStackNavigator,
            navigationOptions: {
                drawerLabel: 'Help'
            }
        },
        about: {
            screen: AboutStackNavigator,
            navigationOptions: {
                drawerLabel: 'About'
            }
        }
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
