import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from'react-native';
import { AuthContext } from './AuthProvider';
import globalStyles from './globalStyles';

export default function ConfigButtonHandler({ currentPage }) {
    const fadeAnim = React.useRef(new Animated.Value(0)).current
    const { userLogout } = React.useContext(AuthContext);
    const [currentPageText, setCurrentPageText] = React.useState('');
    const navigation = useNavigation();
    
    React.useEffect(() => {
        if(currentPage) {
            setCurrentPageText('Minha Conta'); 
        } else {
            setCurrentPageText('Principal');
        }
    }, []);
    React.useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 200,
                useNativeDriver: false,
            }
        ).start()
    }, [fadeAnim]);
    
    return(
        <Animated.View style={[styles.configContainer, {opacity: fadeAnim}]}>
            <TouchableOpacity 
                style={styles.configContainerButton} 
                onPress={() => {      
                    if(currentPage) {
                        navigation.navigate('ConfigRoute');
                    } else {
                        navigation.navigate('MainContentRoute');
                    }
                }}
            >
                <Text style={globalStyles.bold_black_16_karla}>{currentPageText}</Text>
            </TouchableOpacity>
            { currentPage? (
                <TouchableOpacity style={styles.configContainerButton} onPress={() => {userLogout()}}>
                    <Text style={globalStyles.bold_black_16_karla}>Sair</Text>
                </TouchableOpacity>
            ): (null) }
            
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    configContainer: {
        width: 150,
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
        position: 'absolute',
        top: 10,
        right: '15%',
        backgroundColor: '#FBFAFF',
    },
    configContainerButton: {
        borderBottomColor: '#CCC591',
        borderBottomWidth: 1, 
        paddingVertical: 10,      
    },
});