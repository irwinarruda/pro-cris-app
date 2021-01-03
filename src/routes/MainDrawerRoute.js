import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainContentRoute from './MainContentRoute';
import ConfigRoute from './ConfigRoute';

const MainDrawer = createDrawerNavigator();

export default function MainDrawerRoute() {
    return (
        <MainDrawer.Navigator 
            screenOptions={{
                gestureEnabled: false,
                swipeEnabled: false,
            }} 
        >
            <MainDrawer.Screen name='MainContentRoute' component={ MainContentRoute } />
            <MainDrawer.Screen name='ConfigRoute' component={ ConfigRoute } />
        </MainDrawer.Navigator>
    );
}