import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AddLesson from '../screens/AddLesson';
import RemoveLesson from '../screens/RemoveLesson';


const MainContentTab = createMaterialTopTabNavigator();

export default function MainTabRoute() {
    return(
        <MainContentTab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({color, size}) => {
                    let iconName;
                    if(route.name === 'AddLesson') {
                        iconName = 'clipboard';
                    } else {
                        iconName = 'money-bill-alt'
                    }
                    
                    return <FontAwesome5 name={iconName} size={18} color={color} />; 
                },
            })}

            tabBarOptions={{
                showIcon: true,
                showLabel: false,
                activeTintColor: '#F3F2F7',
                inactiveTintColor: '#F3F2F7',
                indicatorStyle: {
                    height: 3,
                    backgroundColor: '#BAB273',
                },
                tabStyle: {
                    display: 'flex',
                    alginItems: 'center',
                    justifyContent: 'center',
                    paddingTop: 15,
                    height: '100%',
                    borderLeftColor: '#CCC4F2',
                    borderLeftWidth: 1,
                    borderRightColor: '#CCC4F2',
                    borderRightWidth: 1,
                },

                style: {
                    height: 55,
                    backgroundColor: '#9A8DD6'
                },
            }}
            tabBarPosition='top'
            
        >
            <MainContentTab.Screen name='AddLesson' component={ AddLesson }  />
            <MainContentTab.Screen name='RemoveLesson' component={ RemoveLesson }  />
        </MainContentTab.Navigator>
    );
}
