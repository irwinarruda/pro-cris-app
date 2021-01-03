import React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import logo from '../../assets/pro-cris-w.png';
import Animated from 'react-native-reanimated';

export default function Header() {
    const [page, setPage] = React.useState(true);
    const navigation = useNavigation();
    let activeStylesLeft = {
        width: '50%',
        height: 4,
        backgroundColor: '#BAB273',
        position: 'absolute',
        bottom: 0,
        left: 0,
    };
    let activeStylesRight = {
        width: '50%',
        height: 4,
        backgroundColor: '#BAB273',
        position: 'absolute',
        bottom: 0,
        right: 0,
    };

    function rightButtonPress() {
        if(!navigation.canGoBack()) {
            setPage(false); 
            navigation.navigate('RemoveLesson'); 
        }
        console.log(navigation.canGoBack())
          
    }
    function leftButtonPress() {
        if(navigation.canGoBack()) {
            setPage(true);
            navigation.navigate('AddLesson');
        }    
        
    }
    return (
        <View style={styles.containerHeader}>
            <View style={styles.topContainer}>
                <View>
                    <Image style={styles.logoImage} source={logo} />
                </View>
                <View>
                    <TouchableOpacity activeOpacity={0.4}>
                        <Entypo name="dots-three-vertical" size={24} color="#CCC4F2" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <TouchableOpacity  style={styles.leftButton} onPress={leftButtonPress} >
                    <FontAwesome5 name="clipboard" size={34} color="#F3F2F7" />     
                </TouchableOpacity>
                <TouchableOpacity  style={styles.rightButton} onPress={rightButtonPress}>
                    <FontAwesome5 name="money-bill-alt" size={34} color="#F3F2F7" />          
                </TouchableOpacity>
                <View style={page ? activeStylesLeft: activeStylesRight}></View>
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
        flex: 1,
        backgroundColor: '#7C6FBD',
        
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
    bottomContainer: {
        backgroundColor: '#9A8DD6',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    leftButton: {
        paddingVertical: 15,
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: '#CCC4F2',
        borderRightWidth: 1,
        borderTopColor: '#CCC4F2',
        borderTopWidth: 2,
    },
    rightButton: {
        paddingVertical: 15,
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftColor: '#CCC4F2',
        borderLeftWidth: 1,
        borderTopColor: '#CCC4F2',
        borderTopWidth: 2,
    },
    indicationBar: {
        width: '50%',
        height: 4,
        backgroundColor: '#BAB273',
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    logoImage: {
        width: 131,
        resizeMode: 'contain',
    }
}); 