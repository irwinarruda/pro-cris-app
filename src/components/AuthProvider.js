import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = React.createContext({});

export function AuthProvider({children}) {
    const [user, setUser] = React.useState(null);
    const [students, setStudents] = React.useState([]);
    return (
        <AuthContext.Provider value={{
            user,
            userLogin: (userObj) => {
                setUser(userObj);
                AsyncStorage.setItem('user', JSON.stringify(user))
            },
            userLogout: (userObj) => {
                setUser(null);
                AsyncStorage.removeItem('user')
            },
            students,
            studentsAdd: async (studentsObj) => {
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
            },
            studentsDestroy: () => {
                setStudents([]);
            }
        }}>
            {children}
        </AuthContext.Provider>
    );
}