import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function GoldButton(props) {
    return (
        <TouchableOpacity 
            style={ styles.redButtonYellow }
            activeOpacity='0.7'
            {...props}
        >
            <Text style={styles.redButtonYellowText}>{ props.children }</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    redButtonYellowText: {
        fontFamily: 'Yellowtail_400Regular',
        fontSize: 14,
        color: '#FBFAFF',
    },
    redButtonYellow: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 30,
        paddingVertical: 5,
        paddingHorizontal: 25,
        backgroundColor: '#FF2919',
        borderRadius: 5,
    },
});