import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ViewForm from '../components/ViewForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../components/AuthProvider';
import LoadingScreen from '../screens/LoadingScreen';
import LoginRegisterRoute from './LoginRegisterRoute';
import MainDrawerRoute from './MainDrawerRoute'

export default function Routes() {
    const { user, login, logout } = React.useContext(AuthContext);
    const [loading, setLoading] = React.useState(true);
    
    React.useEffect(() => {
        login({ username: 'Irwin Arruda'})
        //logout();
        AsyncStorage.getItem('user')
        .then(userString => {
            if(userString) {
                console.log(userString);
            }      
        })
        .catch(err => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        })
    }, []);

    if(loading) {
        return (
            <LoadingScreen />
        );
    }
    if(user) {
        return (
            <NavigationContainer>
                <MainDrawerRoute />
            </NavigationContainer>
        );
    } else {
        return(
            <NavigationContainer>
                <LoginRegisterRoute />
            </NavigationContainer>
        );
    }
   
}