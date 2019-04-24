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

        return isLocalizerInitialized && (
            <View style={[appStyles.app, appStyles.container, appStyles.vertical, appStyles.justifyStart]}>
                <Provider store={store}>
                    <BooksScreenComponent/>
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
