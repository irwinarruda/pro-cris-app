import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function GoldButton(props) {
    return (
        <TouchableOpacity 
            style={ styles.goldButtonYellow }
            activeOpacity='0.7'
            {...props}
        >
            <Text style={styles.goldButtonYellowText}>{ props.children }</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    goldButtonYellowText: {
        fontFamily: 'Yellowtail_400Regular',
        fontSize: 48,
        color: '#FBFAFF',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    goldButtonYellow: {
        width: 232,
        height: 72,
        paddingVertical: 5,
        paddingHorizontal: 50,
        backgroundColor: '#CCC591',
        borderRadius: 10,
    },
});