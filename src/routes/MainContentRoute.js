import React from 'react';
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from '@react-navigation/stack';
import AddLesson from '../screens/AddLesson';
import RemoveLesson from '../screens/RemoveLesson';
import Header from '../components/Header';
import { Easing } from 'react-native-reanimated';

const MainContentStack = createStackNavigator();

export default function MainContentRoute(props) {

    return (
        <MainContentStack.Navigator
            initialRouteName="AddLesson"
            headerMode='float'
            screenOptions={{
                headerTitle: (props) => <Header {...props} />,
                headerStyle: {
                    backgroundColor: '#7C6FBD',    
                    height: 167,    
                },
                headerLeft: () => null,
                headerTitleAlign: "center", 
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                gestureEnabled: true, 
                gestureDirection: 'horizontal', 
                swipeEnabled: true,
            }}
        >
            <MainContentStack.Screen name='AddLesson' component={ AddLesson }  />
            <MainContentStack.Screen name='RemoveLesson' component={ RemoveLesson }  />
        </MainContentStack.Navigator>
    );
} 
