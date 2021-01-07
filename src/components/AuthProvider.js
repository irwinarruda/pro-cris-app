import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = React.createContext({});

export function AuthProvider({children}) {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [students, setStudents] = React.useState([]);
    const [settingsActive, setSettingsActive] = React.useState(false);
    return (
        <AuthContext.Provider value={{
            user,
            loading,
            userIsLoged: () => {               
                AsyncStorage.getItem('user')
                .then((userStorage) => {
                    if(userStorage != null) {
                        setUser(userStorage);
                    }
                })
                .catch(err => console.error(err))
                .finally(() => {
                    setLoading(false);
                });
            },
            userLogin: (userObj) => {
                setUser(userObj);
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
                        setStudents(JSON.parse(studentsArr));
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
            },
            studentsAdd: (studentsParam) => {
                AsyncStorage.getItem('students')
                .then((studentsArr) => {
                    const studentJson = JSON.parse(studentsArr);
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
                    if(studentJson) {
                        const newChangedStudentsArr = studentJson.map((student) => {
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
                AsyncStorage.setItem('students', JSON.stringify([...students]));
            },
            studentsDelete: (studentsParam) => {
                AsyncStorage.getItem('students')
                .then((studentsArr) => {
                    const studentJson = JSON.parse(studentsArr);
                    if(studentJson) {
                        let newChangedStudentsArr = []
                        for(let i = 0; i < studentJson.length; i++) {       
                            if(studentsParam.id !== studentJson[i].id) {
                                newChangedStudentsArr.push(studentJson[i]);
                            } 
                        }
                        setStudents([...newChangedStudentsArr]);     
                        AsyncStorage.setItem('students', JSON.stringify([...newChangedStudentsArr]));
                    } 
                })
                .catch((err) => {
                    console.error(err);
                });
                AsyncStorage.setItem('students', JSON.stringify([...students]));
            },
            studentsDestroy: () => {
                AsyncStorage.removeItem('students');
                setStudents([]);
            },

            settingsActive,
            settingsChange: () => {
                //console.log(settingsActive);
                setSettingsActive(!settingsActive);
            },
        }}>
            {children}
        </AuthContext.Provider>
    );
}