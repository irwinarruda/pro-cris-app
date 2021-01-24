import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../components/AuthProvider';
import globalStyles from '../components/globalStyles';
import * as FileSystem  from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';
import * as SQLite from 'expo-sqlite';

export default function DatabaseHandler() {
    const { studentsAddArr } = React.useContext(AuthContext);    
    const [checker, setChecker] = React.useState(false);
    const [newStudentsArray, setNewStudentsArray] = React.useState([]);

    React.useEffect(() => {
        if(newStudentsArray.length > 0) studentsAddArr(newStudentsArray);        
    }, [newStudentsArray]);

    async function handleExportDbPress() {
        let dbUri = `${FileSystem.documentDirectory}/SQLite/database.db`;
        await Sharing.shareAsync(dbUri);
    }

    async function handleUploadDbPress() {
        try {
            const document = await DocumentPicker.getDocumentAsync();

            await FileSystem.copyAsync({
                from: document.uri,
                to: `${FileSystem.documentDirectory}/SQLite/newSqlite.db`
            });

            const db = SQLite.openDatabase('newSqlite.db');
            db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: []}], false, () => console.log('foreign keys turned on'));
            db.transaction(
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
                            setNewStudentsArray(studentsArr);
                        },
                        error => console.log(error)
                    );
                }
            );

        } catch(err) {
            console.log(err);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.exportContainer}>
                <Text style={globalStyles.bold_black_18_karla}>Exportar banco de dados</Text>
                <TouchableOpacity 
                    style={ styles.buttonContainer }
                    activeOpacity={0.7}
                    onPress={() => handleExportDbPress()}
                >
                    <Text style={[globalStyles.bold_white_24_karla, styles.buttonText]}>Exportar</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.uploadContainer}>
                <Text style={globalStyles.bold_black_18_karla}>Upload banco de dados</Text>
                <TouchableOpacity 
                    style={ styles.buttonContainer }
                    activeOpacity={0.7}
                    onPress={() => handleUploadDbPress()}
                >
                    <Text style={[globalStyles.bold_white_24_karla, styles.buttonText]}>Upload</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 0,
        position: 'relative',
    },
    exportContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#BAB273',
        paddingBottom: 50,
    },
    uploadContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 130,
        height: 45,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#2DCC69',
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        fontFamily: 'Yellowtail_400Regular',
        fontSize: 24,
    },
});