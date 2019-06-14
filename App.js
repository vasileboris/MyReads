import React from 'react';
import {
    View
} from 'react-native';
import {
    createStore,
    applyMiddleware
} from 'redux';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'sagas/RootSagas';
import { createAppDrawerNavigator } from 'components/navigation/AppNavigation';
import { library }  from 'reducers/LibraryReducer';
import localizer from 'utils/Localizer';
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

        if(!isLocalizerInitialized) {
            return null;
        }

        const AppDrawerNavigator = createAppDrawerNavigator(),
            AppContainer = createAppContainer(AppDrawerNavigator);

        return (
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
