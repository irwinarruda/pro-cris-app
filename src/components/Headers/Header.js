import React from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import logo from '../../../assets/pro-cris-w.png';
import { useNavigation } from '@react-navigation/native';

export default function Header() {
    const navigation = useNavigation();

    function configButtonPress() {
        navigation.toggleDrawer();
    }
    return (
        <View style={styles.containerHeader}>
            <View style={styles.topContainer}>
                <View>
                    <Image style={styles.logoImage} source={logo} />
                </View>
                <TouchableOpacity style={{paddingLeft: 20, paddingRight: 0, paddingVertical: 5,}} activeOpacity={0.4} onPress={configButtonPress}>
                    <Entypo name="dots-three-vertical" size={24} color="#CCC4F2" />
                </TouchableOpacity>
            </View>
        </View>    
    );
}

const styles = StyleSheet.create({
    containerHeader: {
        height: '100%',
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#7C6FBD',
        position: 'relative',
        borderBottomColor: '#CCC4F2',
        borderBottomWidth: 2,
    },
    topContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 0,
        paddingBottom: 0,
    },  
    logoImage: {
        width: 131,
        resizeMode: 'contain',
    },
}); 