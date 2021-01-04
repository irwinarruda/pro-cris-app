import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../components/AuthProvider';
import LoadingScreen from '../screens/LoadingScreen';
import LoginRegisterRoute from './LoginRegisterRoute';
import MainDrawerRoute from './MainDrawerRoute';

const fakeStudents = [
    {
        id: '1',
        kidName: 'Gabriel Fernandes',
        dateObirth: '07/01/2000',
        parentName: 'Cristiani',
        phoneNumber: '(62) 98888-8888',
        houseNumber: 'Apto. 27',
        givenClassesDate: ['07/01', '08/01', '09/01', '10/01'],
        price: 100,      
    },
    {
        id: '2',
        kidName: 'Katarina',
        dateObirth: '07/01/2000',
        parentName: 'Cristiani',
        phoneNumber: '(62) 98888-8888',
        houseNumber: 'Apto. 304',
        givenClassesDate: ['07/01', '08/01', '09/01', '10/01', '07/01', '08/01', '09/01', '10/01', '07/01', '08/01', '09/01', '10/01'],
        price: 100,      
    },
    {
        id: '3',
        kidName: 'Helena Helena Helena Helena Helena',
        dateObirth: '07/01/2000',
        parentName: 'Cristiani',
        phoneNumber: '(62) 98888-8888',
        houseNumber: 'Apto. 502',
        givenClassesDate: ['07/01', '08/01', '09/01', '10/01'],
        price: 100,      
    },
    {
        id: '4',
        kidName: 'Irwin Arruda',
        dateObirth: '07/01/2000',
        parentName: 'Cristiani',
        phoneNumber: '(62) 98888-8888',
        houseNumber: '904 torre Sul',
        givenClassesDate: ['07/01', '08/01', '09/01', '10/01'],
        price: 100,      
    }
]

export default function Routes() {
    const { user, userLogin, userLogout, students, studentsAdd, studentsEdit, studentsDelete } = React.useContext(AuthContext);
    const [loading, setLoading] = React.useState(true);
    
    React.useEffect(() => {
        //userLogin({ username: 'Irwin Arruda'});
        //userLogout();
        AsyncStorage.getItem('user')
        .then(userString => {
            if(userString) {
                console.log(userString);
                userLogin(userString);
            }      
        })
        .catch(err => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        });
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