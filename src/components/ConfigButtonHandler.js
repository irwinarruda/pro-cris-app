import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from'react-native';
import { AuthContext } from './AuthProvider';
import globalStyles from './globalStyles';

export default function ConfigButtonHandler({ currentPage }) {
    const { userLogout } = React.useContext(AuthContext);
    const navigation = useNavigation();
    const [currentPageText, setCurrentPageText] = React.useState('');
    React.useEffect(() => {
        if(currentPage) {
            setCurrentPageText('Minha Conta'); 
        } else {
            setCurrentPageText('Principal');
        }
    }, []);
    return(
        <View style={styles.configContainer}>
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
            
        </View>
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