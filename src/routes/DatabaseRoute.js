import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Header from '../components/Headers/Header';
import DatabaseHandler from '../screens/DatabaseHandler';

const screens = {
    DatabaseHandler: {
        screen: DatabaseHandler,
        navigationOptions: {
            title: 'Database Handler'
        },
    },
};

const DatabaseStack = createStackNavigator(screens, {
    headerMode: 'float',
    defaultNavigationOptions: ({navigation}) => {
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
    },
});

export default DatabaseStack;