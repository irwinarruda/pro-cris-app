import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import UserConfig from '../screens/UserConfig';
import Header from '../components/Headers/Header';

const ConfigStack = createStackNavigator();

export default function ConfigRoute() {
    return (
        <ConfigStack.Navigator
            initialRouteName="UserConfig"
            headerMode='float'
            screenOptions={{
                headerTitle: () => <Header />,
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