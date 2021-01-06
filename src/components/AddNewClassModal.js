import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Modal, TextInput, ScrollView, FlatList } from 'react-native';
import globalStyles from './globalStyles';
import ViewForm from './ViewForm';
import GreenButton from './GreenButton';
import RedButton from './RedButton';

export default function AddNewClassModal({ item, visible }) {

    return(
        <Modal visible={visible} animationType='slide' transparent={true}>
            <ViewForm style={styles.container}>
                <View style={styles.boxContainer}>
                    <Text style={globalStyles.bold_black_18_karla}>Olá</Text>
                </View>
            </ViewForm>
        </Modal>
    ); 
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    boxContainer: {
        backgroundColor: '#fff',
        height: 170,
        width: 300, 
        padding: 10,
        shadowColor: "#000",
        borderColor: '#CCC591',
        borderWidth: 1,
        borderRadius: 10,
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});