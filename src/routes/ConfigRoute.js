import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserConfig from '../screens/UserConfig';
//import { NavigationContainer } from '@react-navigation/native';

const ConfigStack = createStackNavigator();

export default function ConfigRoute() {
    return (
        <ConfigStack.Navigator
            initialRouteName="UserConfig"
        >
            <ConfigStack.Screen name='UserConfig' component={ UserConfig }/>
        </ConfigStack.Navigator>
    );
} 