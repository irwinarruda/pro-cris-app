import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainContentRoute from './MainContentRoute';
import DatabaseRoute from './DatabaseRoute';
import LogoutScreen from '../screens/LogoutScreen';

const MainDrawer = createDrawerNavigator();

export default function MainDrawerRoute() {
    return (
        <MainDrawer.Navigator 
            drawerPosition='right'
            overlayColor={1}
            drawerStyle={{
                width: 150,
                height: 150,
                marginTop: 25,
                elevation: 6,
            }}
            drawerContentOptions={{
                activeTintColor: '#BAB273',
                activeBackgroundColor: '#FFFFFF',
                itemStyle: {
                    marginTop: 0,
                    marginBottom: 0, 
                    padding: 0,
                },
                labelStyle: {
                    fontFamily: 'Karla_700Bold',
                },
                contentContainerStyle: {
                    paddingTop: 10,
                },
            }}
            screenOptions={{
                gestureEnabled: true,
                swipeEnabled: false,
            }} 
        >
            <MainDrawer.Screen name='Home' component={ MainContentRoute } />
            <MainDrawer.Screen name='Export Db' component={ DatabaseRoute } />
            <MainDrawer.Screen name='Sair' component={ LogoutScreen } />
        </MainDrawer.Navigator>
    );
}