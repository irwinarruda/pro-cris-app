
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Animated } from'react-native';
import { AuthContext } from '../AuthProvider';
import globalStyles from '../globalStyles';

export default function LeaveHandler() {
    const fadeAnim = React.useRef(new Animated.Value(0)).current
    const { userLogout } = React.useContext(AuthContext);
    
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
            <TouchableOpacity style={styles.configContainerButton} onPress={() => {userLogout()}}>
                <Text style={globalStyles.bold_black_16_karla}>Sair</Text>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    configContainer: {
        width: 100,
        height: 50,
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
        position: 'absolute',
        top: -30,
        right: '15%',
        backgroundColor: '#FBFAFF',
        zIndex: 10000,
    },
    configContainerButton: {
        borderBottomColor: '#CCC591',
        borderBottomWidth: 1, 
        paddingTop: 5,      
    },
});