import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import MainContentRoute from './MainContentRoute';
import DatabaseRoute from './DatabaseRoute';
import LogoutScreen from '../screens/LogoutScreen';

const screens = {
    MainContentRoute: {
        screen: MainContentRoute,
        navigationOptions: {
            headerTitle: 'Home',
        },
    },
    DatabaseRoute: {
        screen: DatabaseRoute,
        navigationOptions: {
            headerTitle: 'Exportar DB',
        },
    },
    LogoutScreen: {
        screen: LogoutScreen,
        navigationOptions: {
            headerTitle: 'Logout',
        },
    },
};

const MainDrawerRoute = createDrawerNavigator(screens, {
    drawerPosition: 'right',
    backBehavior: 'history',
    detachInactiveScreens: false,
    drawerStyle: {
        width: 150,
        height: 200,
        marginTop: 25,
        borderRadius: 20,
        elevation: 6,
    },
    drawerContentOptions: {
        activeTintColor: '#BAB273',
        activeBackgroundColor: '#FFFFFF',
        itemStyle: {
            marginTop: 0,
            marginBottom: 0, 
        },
        contentContainerStyle: {
            paddingTop: 10,
        },
    },
    defaultNavigationOptions: {
        gestureEnabled: false,
        swipeEnabled: false,
    }
});

export default createAppContainer(MainDrawerRoute);