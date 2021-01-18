String.prototype.slice_Number = function (params) {
    if(this.length > 0) {
        let object = this.split(params);
        let array = [];
        for (let i = 0; i < object.length; i++) {
            array.push(object[i]);
        }
        return array;
    } else {
        return [];
    }
}

Array.prototype.slice_String = function(params) {
    if(this.length > 0) {
        let str = '';
        let i;
        for(i = 0; i < this.length - 1; i++) {
            str += `${this[i]}, `
        }
        str += `${this[i]}`;
        return str;
    }
    else {
        return '';
    }
}

import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatabaseInit from '../db/sqliteDatabaseInit';

export const AuthContext = React.createContext({});

export function AuthProvider({children}) {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [students, setStudents] = React.useState([]);
    let sqlDb = new DatabaseInit();

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
                sqlDb._db.transaction(
                    tx => {
                        tx.executeSql(
                            `SELECT * FROM alunos;`,
                            [],
                            (_, { rows }) => {
                                let studentsArr = []
                                for(let i = 0; i < rows["length"]; i++) {
                                    studentsArr.push({
                                        id: rows['_array'][i].id.toString(),
                                        kidName: rows['_array'][i].kidName,
                                        dateBirth: rows['_array'][i].dateBirth,
                                        parentName: rows['_array'][i].parentName,
                                        phoneNumber: rows['_array'][i].phoneNumber,
                                        houseNumber: rows['_array'][i].houseNumber,
                                        givenClasses: rows['_array'][i].givenClasses.slice_Number(', '),
                                        price: rows['_array'][i].price,  
                                    });
                                }
                                setStudents(studentsArr);
                            }
                        );
                    }
                )
            },
            studentsAdd: (studentsParam) => {
                sqlDb._db.transaction(
                    tx => {
                        tx.executeSql(
                            `INSERT INTO alunos(kidName, dateBirth, parentName, phoneNumber, houseNumber, givenClasses, price) VALUES(
                                '${studentsParam.kidName}',
                                '${studentsParam.dateBirth}',
                                '${studentsParam.parentName}',
                                '${studentsParam.phoneNumber}',
                                '${studentsParam.houseNumber}',
                                '${studentsParam.givenClasses.slice_String()}',
                                '${studentsParam.price}'
                            );`,
                            [],
                            () => {},
                            error => console.log(error)
                        );
                    }
                );
                sqlDb._db.transaction(
                    tx => {
                        tx.executeSql(
                            `SELECT * FROM alunos;`,
                            [],
                            (_, { rows }) => {
                                let studentsArr = []
                                for(let i = 0; i < rows["length"]; i++) {
                                    studentsArr.push({
                                        id: rows['_array'][i].id.toString(),
                                        kidName: rows['_array'][i].kidName,
                                        dateBirth: rows['_array'][i].dateBirth,
                                        parentName: rows['_array'][i].parentName,
                                        phoneNumber: rows['_array'][i].phoneNumber,
                                        houseNumber: rows['_array'][i].houseNumber,
                                        givenClasses: rows['_array'][i].givenClasses.slice_Number(', '),
                                        price: rows['_array'][i].price,  
                                    });
                                }
                                setStudents(studentsArr);
                            },
                            error => console.log(error)
                        );
                    }
                );
            },
            studentsAddArr: (studentsParamArr) => {
                sqlDb._db.transaction(
                    tx => {
                        tx.executeSql(
                            `DELETE FROM alunos`,
                            [],
                            () => {},
                            error => console.log(error)
                        );
                        for(let i = 0; i < studentsParamArr.length; i++) {
                            tx.executeSql(
                                `INSERT INTO alunos(kidName, dateBirth, parentName, phoneNumber, houseNumber, givenClasses, price) VALUES(
                                    '${studentsParamArr[i].kidName}',
                                    '${studentsParamArr[i].dateBirth}',
                                    '${studentsParamArr[i].parentName}',
                                    '${studentsParamArr[i].phoneNumber}',
                                    '${studentsParamArr[i].houseNumber}',
                                    '${studentsParamArr[i].givenClasses.slice_String()}',
                                    '${studentsParamArr[i].price}'
                                );`,
                                [],
                                () => {},
                                error => console.log(error)
                            );
                        }      
                    }
                );
                setStudents(studentsParamArr);
            },
            studentsEdit: (studentsParam) => {
                sqlDb._db.transaction(
                    tx => {
                        tx.executeSql(
                            `UPDATE alunos
                            SET kidname = '${studentsParam.kidName}',
                                dateBirth = '${studentsParam.dateBirth}',
                                parentName = '${studentsParam.parentName}',
                                phoneNumber = '${studentsParam.phoneNumber}',
                                houseNumber = '${studentsParam.houseNumber}',
                                givenClasses = '${studentsParam.givenClasses.slice_String()}',
                                price = '${studentsParam.price}'
                            WHERE id = ${studentsParam.id};`,
                            [],
                            () => {},
                            error => console.log(error)
                        );
                    }
                );
                sqlDb._db.transaction(
                    tx => {
                        tx.executeSql(
                            `SELECT * FROM alunos;`,
                            [],
                            (_, { rows }) => {
                                let studentsArr = []
                                for(let i = 0; i < rows["length"]; i++) {
                                    studentsArr.push({
                                        id: rows['_array'][i].id.toString(),
                                        kidName: rows['_array'][i].kidName,
                                        dateBirth: rows['_array'][i].dateBirth,
                                        parentName: rows['_array'][i].parentName,
                                        phoneNumber: rows['_array'][i].phoneNumber,
                                        houseNumber: rows['_array'][i].houseNumber,
                                        givenClasses: rows['_array'][i].givenClasses.slice_Number(', '),
                                        price: rows['_array'][i].price,  
                                    });
                                }
                                setStudents(studentsArr);
                            },
                            error => console.log(error)
                        );
                    }
                );
            },
            studentsDelete: (studentsParam) => {
                sqlDb._db.transaction(
                    tx => {
                        tx.executeSql(
                            `DELETE FROM alunos
                            WHERE id = ?;`,
                            [studentsParam.id],
                            () => {},
                            error => console.log(error)
                        );
                    }
                );
                sqlDb._db.transaction(
                    tx => {
                        tx.executeSql(
                            `SELECT * FROM alunos;`,
                            [],
                            (_, { rows }) => {
                                let studentsArr = []
                                for(let i = 0; i < rows["length"]; i++) {
                                    studentsArr.push({
                                        id: rows['_array'][i].id.toString(),
                                        kidName: rows['_array'][i].kidName,
                                        dateBirth: rows['_array'][i].dateBirth,
                                        parentName: rows['_array'][i].parentName,
                                        phoneNumber: rows['_array'][i].phoneNumber,
                                        houseNumber: rows['_array'][i].houseNumber,
                                        givenClasses: rows['_array'][i].givenClasses.slice_Number(', '),
                                        price: rows['_array'][i].price,  
                                    });
                                }
                                setStudents(studentsArr);
                            },
                            error => console.log(error)
                        );
                    }
                );
            },
            studentsDestroy: () => {
                sqlDb._db.transaction(
                    tx => tx.executeSql(
                        `DROP TABLE alunos`,
                        [],
                        () => {},
                        error => console.log(error)
                    )
                );
                setStudents([]);
            },
        }}>
            {children}
        </AuthContext.Provider>
    );
}