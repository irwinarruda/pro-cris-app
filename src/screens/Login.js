import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import globalStyles from '../components/globalStyles';
import logo from '../../assets/pro-cris-b.png';
import GoldButton from '../components/GoldButton';
import ViewForm from '../components/ViewForm';

export default function Login({ navigation }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    function handlePressCriar() {
        navigation.navigate('Register');
    }
    return (
        <ViewForm style={globalStyles.container}>
            <Image source={logo} />
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Text style={globalStyles.bold_black_24_karla}>E-mail</Text>
                    <TextInput style={styles.input} onChangeText={(val) => setEmail(val)}/>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={globalStyles.bold_black_24_karla}>Senha</Text>
                    <TextInput style={styles.input} secureTextEntry={true} onChangeText={(val) => setPassword(val)}/>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <GoldButton>Entrar</GoldButton>
            </View>

            <TouchableOpacity  style={styles.criarContainer} activeOpacity={0.7} onPress={handlePressCriar}>
                <Text style={globalStyles.bold_black_18_karla}>Criar Conta</Text>
            </TouchableOpacity>
        </ViewForm>
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#9A8DD6',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 13,
        fontFamily: 'Karla_700Bold',
        fontSize: 24,
        color: '#FBFAFF',
        marginTop: 7,
    },
    inputContainer: {
        marginTop: 20,
    },
    buttonContainer: {
        marginTop: 45,
    },
    formContainer: {
        width: '100%',
        marginTop: 40,
    },
    criarContainer: {
        marginTop: 15,
    }
});