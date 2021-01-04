import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = React.createContext({});

const fakeStudents = [
    {
        id: '1',
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
    const [students, setStudents] = React.useState([]);
    return (
        <AuthContext.Provider value={{
            user,
            userLogin: (userObj) => {
                const fakeUser = { username: 'irwin' }
                //setUser(fakeUser);
                setUser(userObj);
                AsyncStorage.setItem('user', JSON.stringify(fakeUser))
            },
            userLogout: (userObj) => {
                setUser(null);
                AsyncStorage.removeItem('user')
            },
            students,
            studentsAdd: (studentsObj) => {
                if(students.length === 0) {
                    setStudents([studentsObj]);
                } else {
                    setStudents([...students, studentsObj]);
                }
            },
            studentsEdit: (studentsObj) => {
                if(students.length === 0) {
                    //error
                } else {
                    setStudents(students.map((student) => {
                        if(student.id === studentsObj.id) {
                            return studentsObj;
                        } 
                        return student;
                    }));
                }
            },
            studentsDelete: (studentsId) => {
                setStudents(students.filter((student) => {
                    if(student.id !== studentsId) {
                        return student;
                    }
                }));
            }
        }}>
            {children}
        </AuthContext.Provider>
    );
}