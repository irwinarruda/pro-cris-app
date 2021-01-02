import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import globalStyles from '../components/globalStyles';
import logo from '../../assets/pro-cris-b.png';
import GoldButton from '../components/GoldButton';
import ViewForm from '../components/ViewForm';

export default function Register({ navigation }) {
    function handlePressCriar() {
        navigation.navigate('Login');
    }
    return (
        <ViewForm style={globalStyles.container}>
            <Image source={logo} />
            <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
                    <Text style={globalStyles.bold_black_24_karla}>Nome</Text>
                    <TextInput style={styles.input} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={globalStyles.bold_black_24_karla}>E-mail</Text>
                    <TextInput style={styles.input} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={globalStyles.bold_black_24_karla}>Senha</Text>
                    <TextInput style={styles.input} secureTextEntry={true} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={globalStyles.bold_black_24_karla}>Confirmar Senha</Text>
                    <TextInput style={styles.input} secureTextEntry={true} />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <GoldButton>Criar</GoldButton>
            </View>
            <TouchableOpacity activeOpacity={0.7} style={styles.criarContainer} onPress={ handlePressCriar }>
                <Text style={globalStyles.bold_black_18_karla}>Já tem uma conta?</Text>
                <Text style={globalStyles.bold_black_18_karla}>Clike Aqui</Text>
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
        marginTop: 10,
    },
    buttonContainer: {
        marginTop: 45,
    },
    formContainer: {
        width: '100%',
        marginTop: 15,
    },
    criarContainer: {
        width: 250,
        marginTop: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
});