import React from 'react';
//import { Dimensions, Animated } from 'react-native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import AddLesson from '../screens/AddLesson';
import RemoveLesson from '../screens/RemoveLesson';
import HeaderMain from '../components/HeaderMain';

const MainContentStack = createStackNavigator();

export default function MainContentRoute() {
    const [animatedBar, setAnimatedBar] = React.useState(0);

    return (
        <MainContentStack.Navigator
            initialRouteName="AddLesson"
            headerMode='float'
            screenOptions={{
                headerTitle: () => <HeaderMain animatedBar={animatedBar} setAnimatedBar={setAnimatedBar} />,
                headerStyle: {
                    backgroundColor: '#7C6FBD',    
                    height: 167, 
                },
                headerLeft: () => null,
                headerTitleAlign: "center", 
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                gestureEnabled: false, 
                gestureDirection: 'horizontal', 
                swipeEnabled: false,
            }}
        >
            <MainContentStack.Screen name='AddLesson' component={ AddLesson }  />
            <MainContentStack.Screen name='RemoveLesson' component={ RemoveLesson }  />
        </MainContentStack.Navigator>
    );
} 
