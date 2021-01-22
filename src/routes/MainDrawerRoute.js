import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainContentRoute from './MainContentRoute';
import ConfigRoute from './ConfigRoute';
import DatabaseRoute from './DatabaseRoute';
import LogoutScreen from '../screens/LogoutScreen';

const MainDrawer = createDrawerNavigator();

export default function MainDrawerRoute() {
    return (
        <MainDrawer.Navigator 
            initialRouteName='Home'
            drawerPosition='right'
            backBehavior='history'
            detachInactiveScreens={false}
            
            drawerStyle={{
                width: 150,
                height: 200,
                marginTop: 25,
                borderRadius: 20,
                elevation: 6,
            }}
            drawerContentOptions={{
                activeTintColor: '#BAB273',
                activeBackgroundColor: '#FFFFFF',
                itemStyle: {
                    marginTop: 0,
                    marginBottom: 0, 
                },
                contentContainerStyle: {
                    paddingTop: 10,
                }
            }}
            screenOptions={{
                gestureEnabled: true,
                swipeEnabled: true,
            }} 
        >
            <MainDrawer.Screen name='Home' component={ MainContentRoute } />
            <MainDrawer.Screen name='Exportar DB' component={ DatabaseRoute } />
            <MainDrawer.Screen name='Config' component={ ConfigRoute } />
            <MainDrawer.Screen name='Logout' component={ LogoutScreen } />
        </MainDrawer.Navigator>
    );
}