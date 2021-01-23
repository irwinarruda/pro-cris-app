import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Header from '../components/Headers/Header';
import MainTabRoute from './MainTabRoute';

const screens = {
    MainTabRoute: {
        screen: MainTabRoute,
        navigationOptions: {
            title: 'Main Tab Route',
        },
    },
};

const MainContentStack = createStackNavigator(screens, {
    headerMode: 'float',
    defaultNavigationOptions: {
        headerTitle: () => <Header />,
        headerStyle: {
            backgroundColor: '#7C6FBD', 
            height: 95,
        }        ,
        headerLeft: () => null,
        headerTitleAlign: 'center',
    },
});

export default MainContentStack;
