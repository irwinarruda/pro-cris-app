import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import globalStyles from '../components/globalStyles';
import * as FileSystem  from 'expo-file-system';
import * as Sharing from 'expo-sharing';
//import * as DocumentPicker from 'expo-document-picker';

export default function DatabaseHandler() {
    async function handleExportDbPress() {
        let dbUri = `${FileSystem.documentDirectory}/SQLite/database.db`;
        await Sharing.shareAsync(dbUri);
    }

    async function handleUploadDbPress() {
        //let document = await DocumentPicker.getDocumentAsync();
        //console.log(document)
        //await FileSystem.downloadAsync(document.uri, `${FileSystem.documentDirectory}/SQLite/database.db`)
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