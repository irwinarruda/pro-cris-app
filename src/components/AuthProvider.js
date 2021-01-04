import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = React.createContext({});

export function AuthProvider({children}) {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [students, setStudents] = React.useState([]);
    return (
        <AuthContext.Provider value={{
            user,
            userIsLoged: () => {               
                AsyncStorage.getItem('user')
                .then((userStorage) => {
                    if(userStorage != null) {
                        console.log(userStorage)
                        setUser(userStorage);
                    }
                })
                .catch(err => console.log(err))
                .finally(() => {
                    setLoading(false);
                });
            },
            userLogin: (userObj) => {
                setUser(userObj)
                AsyncStorage.setItem('user', JSON.stringify(userObj));
            },
            userLogout: (userObj) => {
                setUser(null);
                AsyncStorage.removeItem('user')
            },


            students,
            studentsGet: () => {
                AsyncStorage.getItem('students')
                .then((studentsArr) => {
                    if(studentsArr) {
                        console.log(JSON.parse(studentsArr));
                        setStudents(JSON.parse(studentsArr));
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            },
            studentsAdd: (studentsObj) => {
                AsyncStorage.getItem('students')
                .then((studentsArr) => {
                    const studentJson = JSON.parse(studentsArr);
                    console.log(studentJson); 
                    if(!studentJson) {
                        setStudents([studentsObj]);
                        AsyncStorage.setItem('students', JSON.stringify([studentsObj]));
                    } else {
                        setStudents([...studentJson, studentsObj]);
                        AsyncStorage.setItem('students', JSON.stringify([...studentJson, studentsObj]));
                    }
                })
                .catch((err) => {
                    console.error(err);
                })
            },
            studentsAddArr: (studentsArr) => {
                setStudents(studentsArr);
                AsyncStorage.setItem('students', JSON.stringify(studentsArr));
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
            studentsDestroy: () => {
                AsyncStorage.removeItem('students');
                setStudents([]);
            }
            /* studentsAdd: (studentsObj) => {
                if(students.length === 0) {
                    setStudents([studentsObj]);
                } else {
                    setStudents([...students, studentsObj]);
                }
            },
            studentsAddArr: (studentsArr) => {
                setStudents(studentsArr);
                AsyncStorage.setItem('students', studentsArr);
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
            }, */
            
        }}>
            {children}
        </AuthContext.Provider>
    );
}