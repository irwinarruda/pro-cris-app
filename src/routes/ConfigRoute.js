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
            screenOptions={({navigation}) => {
                return (
                    {
                        headerTitle: () => <Header navigation={navigation} />,
                        headerStyle: {
                            backgroundColor: '#7C6FBD', 
                            height: 95,
                        },
                        headerLeft: () => null,
                        headerTitleAlign: 'center',
                    }
                );
            }}
        >
            <ConfigStack.Screen name='UserConfig' component={ UserConfig }/>
        </ConfigStack.Navigator>
    );
} 