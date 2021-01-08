import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import logo from '../../assets/pro-cris-w.png';

export default function LoadingScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={logo} />
            </View>
            <View style={styles.indicatorContainer}>
                <ActivityIndicator size={75} color='#FBFAFF' />
            </View>
            <View style={styles.copyrightContainer}>
                <Text style={styles.copyright}>Irwin Arruda</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#9A8DD6',
        paddingTop: 180,
    },
    imageContainer: {
        flexGrow: 1,
    },
    indicatorContainer: {
        flexGrow: 1,
    },
    copyrightContainer: {
        marginTop: 150,
        flexGrow: 1,
    },
    copyright: {
        fontFamily: 'Yellowtail_400Regular',
        /*Esse item foi modificado para telas com letras maiores*/
        fontSize: 32,
        color: '#FBFAFF',
    },
});