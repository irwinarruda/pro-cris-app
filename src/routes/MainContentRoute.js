import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import AddLesson from '../screens/AddLesson';
import RemoveLesson from '../screens/RemoveLesson';
import HeaderMain from '../components/HeaderMain';
import HeaderConfig from '../components/HeaderConfig';
import Header from '../components/Header';
//import MainTabRoute from './MainTabRoute';


const MainContentStack = createStackNavigator();

export default function MainContentRoute() {
    //const [animatedBar, setAnimatedBar] = React.useState(0);

    return (
        <MainContentStack.Navigator
            headerMode='float'
            screenOptions={{
                headerTitle: () => <Header />,
                headerStyle: {
                    backgroundColor: '#7C6FBD',    
                    height: 95, 
                },
                headerLeft: () => null,
                headerTitleAlign: "center", 
                
            }}
        >
            <MainContentStack.Screen name='MainTabRoute' component={ MainTabRoute } />
        </MainContentStack.Navigator>
    );
} 
