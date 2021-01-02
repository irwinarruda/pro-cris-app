import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AddLesson from '../screens/AddLesson';
import RemoveLesson from '../screens/RemoveLesson';
import Login from '../screens/Login';
import Register from '../screens/Register';
const Stack = createStackNavigator();

export default function Routes() {
    return(
        <NavigationContainer >
            <Stack.Navigator 
                initialRouteName="Login"
                screenOptions={{
                    header: () => null,
                }}
            >
                <Stack.Screen name='Login' component={ Login }/>
                <Stack.Screen name='Register' component={ Register }/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
{/* <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='AddLesson' component={ AddLesson }/>
                <Stack.Screen name='RemoveLesson' component={ RemoveLesson }/>
            </Stack.Navigator>
        </NavigationContainer> */}