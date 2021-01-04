import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import UserConfig from '../screens/UserConfig';
import HeaderConfig from '../components/HeaderConfig';
//import { NavigationContainer } from '@react-navigation/native';

const ConfigStack = createStackNavigator();

export default function ConfigRoute() {
    return (
        <ConfigStack.Navigator
            initialRouteName="UserConfig"
            headerMode='float'
            screenOptions={{
                headerTitle: () => <HeaderConfig />,
                headerStyle: {
                    backgroundColor: '#7C6FBD',    
                    height: 110, 
                },
                headerLeft: () => null,
                headerTitleAlign: "center", 
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                gestureEnabled: false, 
                gestureDirection: 'horizontal', 
                swipeEnabled: false,
            }}
        >
            <ConfigStack.Screen name='UserConfig' component={ UserConfig }/>
        </ConfigStack.Navigator>
    );
} 