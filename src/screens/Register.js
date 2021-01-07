import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import globalStyles from '../components/globalStyles';
import logo from '../../assets/pro-cris-b.png';
import GoldButton from '../components/Buttons/GoldButton';
import ViewFormLogin from '../components/Views/ViewFormLogin';

export default function Register({ navigation }) {
    const [nome, setNome] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    function handlePressCriar() {
        navigation.navigate('Login');
    }
    return (
        <ViewFormLogin style={globalStyles.containerLoginRegister}>
            <Image source={logo} />
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Text style={globalStyles.bold_black_20_karla}>Nome</Text>
                    <TextInput style={styles.input} onChangeText={(val) => setNome(val)}/>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={globalStyles.bold_black_20_karla}>E-mail</Text>
                    <TextInput style={styles.input} autoCapitalize='none' onChangeText={(val) => setEmail(val)}/>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={globalStyles.bold_black_20_karla}>Senha</Text>
                    <TextInput style={styles.input} secureTextEntry={true} onChangeText={(val) => setPassword(val)} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={globalStyles.bold_black_20_karla}>Confirmar Senha</Text>
                    <TextInput style={styles.input} secureTextEntry={true} onChangeText={(val) => setConfirmPassword(val)} />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <GoldButton>Criar</GoldButton>
            </View>
            <TouchableOpacity activeOpacity={0.7} style={styles.criarContainer} onPress={ handlePressCriar }>
                <Text style={globalStyles.bold_black_18_karla}>Já tem uma conta?</Text>
                <Text style={globalStyles.bold_black_18_karla}>Clique Aqui</Text>
            </TouchableOpacity>
        </ViewFormLogin>
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#9A8DD6',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontFamily: 'Karla_700Bold',
        fontSize: 20,
        color: '#FBFAFF',
        marginTop: 0,
    },
    inputContainer: {
        marginTop: 10,
    },
    buttonContainer: {
        marginTop: 25,
    },
    formContainer: {
        width: '100%',
        marginTop: 5,
    },
    criarContainer: {
        width: 250,
        marginTop: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
});