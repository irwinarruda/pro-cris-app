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
        dateBirth: '07/01/2000',
        parentName: 'Cristiani',
        phoneNumber: '(62) 98888-8888',
        houseNumber: 'Apto. 27',
        givenClasses: ['07/01', '08/01', '09/01', '10/01'],
        price: 100,      
    },
    {
        id: '2',
        kidName: 'Katarina',
        dateBirth: '07/01/2000',
        parentName: 'Cristiani',
        phoneNumber: '(62) 98888-8888',
        houseNumber: 'Apto. 304',
        givenClasses: ['07/01', '08/01', '09/01', '10/01', '07/01', '08/01', '09/01', '10/01', '07/01', '08/01', '09/01', '10/01'],
        price: 100,      
    },
    {
        id: '3',
        kidName: 'Helena Helena Helena',
        dateBirth: '07/01/2000',
        parentName: 'Cristiani',
        phoneNumber: '(62) 98888-8888',
        houseNumber: 'Apto. 502',
        givenClasses: ['07/01', '08/01', '09/01', '10/01'],
        price: 100,      
    },
    {
        id: '4',
        kidName: 'Irwin Arruda',
        dateBirth: '07/01/2000',
        parentName: 'Cristiani',
        phoneNumber: '(62) 98888-8888',
        houseNumber: '904 torre Sul',
        givenClasses: ['07/01', '08/01', '09/01', '10/01'],
        price: 100,      
    }
]

export default function Routes() {
    const { loading, user, userLogin, userLogout, userIsLoged, students, studentsAdd, studentsEdit, studentsDelete, studentsAddArr, studentsGet } = React.useContext(AuthContext);
    
    
    React.useEffect(() => {
        //userLogin({ username: 'Irwin Arruda', arr: [1, 2, 3, 4, 5, 6]});
        //userLogout();
        //studentsAddArr(fakeStudents);  
        userIsLoged();
        studentsGet();      
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