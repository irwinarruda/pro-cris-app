import React from 'react';
import globalStyles from '../components/globalStyles';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../components/AuthProvider';

export default function LogoutScreen() {
    const { userLogout } = React.useContext(AuthContext);
    React.useEffect(() => {
        userLogout();
    }, []);
    function handleLogoutPress() {
        userLogout();
    }
    return(
        <View style={styles.container}>
            <Text>Aperte o botão para sair!</Text>
            <TouchableOpacity 
                style={ styles.buttonContainer }
                activeOpacity={0.7}
                onPress={() => handleLogoutPress()}
            >
                <Text style={[globalStyles.bold_white_24_karla, styles.buttonText]}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 45,
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: '#2DCC69',
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        fontFamily: 'Yellowtail_400Regular',
        fontSize: 20,
    },
});