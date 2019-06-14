import {
    createDrawerNavigator,
    createStackNavigator
} from 'react-navigation';
import BooksScreenComponent from 'components/screens/BooksScreenComponent';
import BookScreenComponent from 'components/screens/BookScreenComponent';
import CurrentReadingSessionScreen from 'components/screens/CurrentReadingSessionScreen';
import HelpScreen from 'components/screens/HelpScreen';
import AboutScreen from 'components/screens/AboutScreen';
import appStyles from 'styles/AppStyles';
import appColors from 'styles/AppColors';
import localizer from 'utils/Localizer';

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

export const createAppDrawerNavigator = () => createDrawerNavigator(
    {
        stackNavigator: {
            screen: BooksStackNavigator,
            navigationOptions: {
                drawerLabel: localizer.localize('app-title')
            }
        },
        help: {
            screen: HelpStackNavigator,
            navigationOptions: {
                drawerLabel: localizer.localize('help-screen')
            }
        },
        about: {
            screen: AboutStackNavigator,
            navigationOptions: {
                drawerLabel: localizer.localize('about-screen')
            }
        }
    }, {
        drawerBackgroundColor: appColors.color2,
        contentOptions: {
            activeTintColor: appColors.color3,
            activeBackgroundColor: appColors.color1,
            labelStyle: appStyles.navigationBarMenuStyle,
            activeLabelStyle: appStyles.activeNavigationBarMenuStyle
        }
    }
);
