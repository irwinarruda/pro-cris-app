import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Header from '../components/Headers/Header';
import DatabaseHandler from '../screens/DatabaseHandler';

const DatabaseStack = createStackNavigator();

export default function DatabaseRoute() {

    return (
        <DatabaseStack.Navigator
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
            <DatabaseStack.Screen name='DatabaseHandler' component={ DatabaseHandler } />
        </DatabaseStack.Navigator>
    );
} 