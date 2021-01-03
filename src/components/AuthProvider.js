import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = React.createContext({});

export function AuthProvider({children}) {
    const [user, setUser] = React.useState(null);
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