import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import globalStyles from '../components/globalStyles';
import * as FileSystem  from 'expo-file-system';
import * as Sharing from 'expo-sharing';
//import * as DocumentPicker from 'expo-document-picker';

export default function DatabaseHandler({navigation}) {
    async function handleExportDbPress() {
        let dbUri = `${FileSystem.documentDirectory}/SQLite/database.db`;
        await Sharing.shareAsync(dbUri);
    }

    async function handleUploadDbPress() {
        //navigation.navigate('Home');
        /* let document = await DocumentPicker.getDocumentAsync();
        console.log(document)
        await FileSystem.downloadAsync(document.uri, `${FileSystem.documentDirectory}/SQLite/database.db`) */
    }
    return (
        <View style={styles.container}>
            <Text style={globalStyles.bold_black_24_karla}>Exportar o banco de dados</Text>
            <TouchableOpacity 
                style={ styles.buttonContainer }
                activeOpacity={0.7}
                onPress={() => handleExportDbPress()}
            >
                <Text style={[globalStyles.bold_white_24_karla, styles.buttonText]}>Export Db</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={ styles.buttonContainer }
                activeOpacity={0.7}
                onPress={() => handleUploadDbPress()}
            >
                <Text style={[globalStyles.bold_white_24_karla, styles.buttonText]}>Upload Db</Text>
            </TouchableOpacity>
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
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 65,
        paddingVertical: 5,
        paddingHorizontal: 30,
        backgroundColor: '#2DCC69',
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        fontFamily: 'Yellowtail_400Regular',
        fontSize: 36,
    },
});