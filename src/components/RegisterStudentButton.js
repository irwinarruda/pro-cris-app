import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

export default function RegisterStudentButton({onPress}) {
    return (
        <TouchableOpacity style={styles.registerContainer} activeOpacity={0.7} onPress={onPress}>
            <AntDesign name="pluscircle" size={55} color="#BAB273" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    registerContainer: {
        position: 'absolute',
        bottom: 35,
        right: 25,
    },
});
