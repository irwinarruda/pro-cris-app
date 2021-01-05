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
            studentsAdd: (studentsParam) => {
                AsyncStorage.getItem('students')
                .then((studentsArr) => {
                    const studentJson = JSON.parse(studentsArr);
                    console.log(studentJson); 
                    if(!studentJson) {
                        setStudents([studentsParam]);
                        AsyncStorage.setItem('students', JSON.stringify([studentsParam]));
                    } else {
                        setStudents([...studentJson, studentsParam]);
                        AsyncStorage.setItem('students', JSON.stringify([...studentJson, studentsParam]));
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
            },
            studentsAddArr: (studentsParamArr) => {
                setStudents(studentsParamArr);
                AsyncStorage.setItem('students', JSON.stringify(studentsParamArr));
            },
            studentsEdit: (studentsParam) => {
                AsyncStorage.getItem('students')
                .then((studentsArr) => {
                    const studentJson = JSON.parse(studentsArr);
                    console.log(studentJson); 
                    if(!studentJson) {
                        const newChangedStudentsArr = studentsJson.map((student) => {
                            if(student.id === studentsParam.id) {
                                return studentsParam;
                            } 
                            return student;
                        })
                        setStudents([...newChangedStudentsArr]);
                        AsyncStorage.setItem('students', JSON.stringify([...newChangedStudentsArr]));
                    } 
                })
                .catch((err) => {
                    console.error(err);
                });
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