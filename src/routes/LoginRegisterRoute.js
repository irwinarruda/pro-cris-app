import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Register from '../screens/Register';

const LoginRegisterStack = createStackNavigator();

export default function LoginRegisterRoute() {
    return (
        <LoginRegisterStack.Navigator 
            initialRouteName='Login'
            screenOptions={{
                header: () => null,
            }}
        >
            <LoginRegisterStack.Screen  name='Login' component={ Login }/>
            <LoginRegisterStack.Screen name='Register' component={ Register }/>
        </LoginRegisterStack.Navigator>
    );
}