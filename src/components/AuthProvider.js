import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = React.createContext({});

const fakeStudents = [
    {
        kidName: 'Irwin Arruda',
        dateObirth: '07/01/2000',
        parentName: 'Cristiani',
        phoneNumber: '(62) 98888-8888',
        houseNumber: '904 torre Sul',
        givenClassesDate: ['07/01', '08/01', '09/01', '10/01'],
        price: 100,      
    }
]
export function AuthProvider({children}) {
    const [user, setUser] = React.useState(null);
    const [students, setStudents] = React.useState(null);
    return (
        <AuthContext.Provider value={{
            user,
            login: (userObj) => {
                const fakeUser = { username: 'irwin' }
                //setUser(fakeUser);
                setUser(userObj);
                AsyncStorage.setItem('user', JSON.stringify(fakeUser))
            },
            logout: (userObj) => {
                setUser(null);
                AsyncStorage.removeItem('user')
            }
        }}>
            {children}
        </AuthContext.Provider>
    );
}