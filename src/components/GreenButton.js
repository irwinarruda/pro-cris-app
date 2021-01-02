import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function GoldButton(props) {
    return (
        <TouchableOpacity 
            style={ styles.greenButtonYellow }
            activeOpacity='0.7'
            {...props}
        >
            <Text style={styles.greenButtonYellowText}>{ props.children }</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    greenButtonYellowText: {
        fontFamily: 'Yellowtail_400Regular',
        fontSize: 14,
        color: '#FBFAFF',
    },
    greenButtonYellow: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 30,
        paddingVertical: 5,
        paddingHorizontal: 25,
        backgroundColor: '#2DCC69',
        borderRadius: 5,
    },
});