import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import globalStyles from '../components/globalStyles';
import logo from '../../assets/pro-cris-b.png';
import GoldButton from '../components/Buttons/GoldButton';
import ViewFormLogin from '../components/Views/ViewFormLogin';
import { AuthContext } from '../components/AuthProvider';

export default function Login({ navigation }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { userLogin } = React.useContext(AuthContext);
    function handlePressCriar() {
        navigation.navigate('Register');
    }
    function handleLogin() {
        userLogin({ username: email, arr: password})
    }
    return (
        <ViewFormLogin style={globalStyles.containerLoginRegister}>
            <Image source={logo} style={styles.image}/>
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Text style={globalStyles.bold_black_20_karla}>E-mail</Text>
                    <TextInput style={styles.input} autoCapitalize='none' onChangeText={(val) => setEmail(val)}/>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={globalStyles.bold_black_20_karla}>Senha</Text>
                    <TextInput style={styles.input} secureTextEntry={true} onChangeText={(val) => setPassword(val)}/>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <GoldButton onPress={handleLogin}>Entrar</GoldButton>
            </View>

            <TouchableOpacity  style={styles.criarContainer} activeOpacity={0.7} onPress={handlePressCriar}>
                <Text style={globalStyles.bold_black_18_karla}>Criar Conta</Text>
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
        fontSize: 16,
        color: '#FBFAFF',
        marginTop: 0,
    },
    inputContainer: {
        marginTop: 20,
    },
    buttonContainer: {
        marginTop: 35,
    },
    formContainer: {
        width: '100%',
        marginTop: 5,
    },
    formContainer: {
        width: '100%',
        marginTop: 20,
    },
    criarContainer: {
        marginTop: 15,
    }
});