import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Modal, TextInput, ScrollView, FlatList } from 'react-native';
import globalStyles from '../components/globalStyles';
import GoldButton from '../components/GoldButton';
import ViewForm from '../components/ViewForm';
import { AntDesign } from '@expo/vector-icons'; 
import logo from '../../assets/20200926_165918.jpg';
import { AuthContext } from '../components/AuthProvider';
import RegisterStudentButton from '../components/RegisterStudentButton';
import AddNewClassModal from '../components/AddNewClassModal';

export default function AddLesson({ navigation }) {
    const [registerStudentModal, setRegisterStudentModal] = React.useState(false);
    const [addNewClassModal, setAddNewClassModal] = React.useState(true);
    const [kidName, setKidName] = React.useState('');
    const [dateBirth, setDateBirth] = React.useState('');
    const [parentName, setParentName] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [houseNumber, setHouseNumber] = React.useState('');
    const [price, setPrice] = React.useState('');

    const { students, studentsAdd, studentsEdit, studentsDelete, studentsDestroy } = React.useContext(AuthContext);

    function handlePress() {
        studentsDestroy()
        //studentsDelete('4');
        /* studentsAdd({
            id: '10',
            kidName: 'Irwin Arruda',
            dateObirth: '07/01/2000',
            parentName: 'Cristiani',
            phoneNumber: '(62) 98888-8888',
            houseNumber: '904 torre Sul',
            givenClassesDate: ['07/01', '08/01', '09/01', '10/01'],
            price: 100,      
        }) */
    }
    function createStudent() {
        var precision = 10000; 
        var randomnum = (Math.floor(Math.random() * (10 * precision - 1 * precision) + 1 * precision) / (1*precision)).toString();
        const newStudentObj = {
            id: randomnum,
            kidName: kidName,
            dateBirth: dateBirth,
            parentName: parentName,
            phoneNumber: phoneNumber,
            houseNumber: houseNumber,
            givenClasses: [],
            price: price,   
        }
        studentsAdd(newStudentObj);
        setRegisterStudentModal(false);
    }
    function handleStudentPress() {

    }
    return (
        <View style={styles.container}>
            {students? (<FlatList 
                data={students}
                renderItem={({item}) => (
                    <TouchableOpacity style={styles.studentContainer} onPress={handleStudentPress}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={logo} />
                        </View>
                        <View style={styles.infoContainer}>
                            <View style={styles.mainInfoContainer}>
                                <Text style={globalStyles.bold_black_18_karla}>{item.kidName}</Text>
                                <Text style={globalStyles.bold_black_14_karla}>{item.houseNumber}</Text>
                            </View>
                            <View style={styles.aditionalInfoContainer}>
                                <Text style={globalStyles.bold_black_12_karla}>A.D.: {item.givenClasses.length}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>)}
                keyExtractor={(item) => item.id}
            />): null}
            <AddNewClassModal visible={addNewClassModal}/>
            <Modal visible={registerStudentModal} animationType='slide'>
                <ViewForm style={styles.modalContainer}>
                    <TouchableOpacity onPress={() => setRegisterStudentModal(false)} activeOpacity={0.3}>
                        <AntDesign name="closecircleo" size={50} color="#BAB273" />
                    </TouchableOpacity>      
                    <Text style={globalStyles.bold_black_18_karla}>Adicionar um Aluno</Text>
                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <Text style={globalStyles.bold_black_18_karla}>Nome do Aluno</Text>
                            <TextInput style={styles.input} placeholder='eg. Cassiel Arruda' autoCapitalize='none' onChangeText={(val) => setKidName(val)}/>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={globalStyles.bold_black_18_karla}>Data de Nascimento</Text>
                            <TextInput style={styles.input} placeholder='eg. 17/10/2006' keyboardType='phone-pad' onChangeText={(val) => setDateBirth(val)}/>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={globalStyles.bold_black_18_karla}>Nome do Responsável</Text>
                            <TextInput style={styles.input} placeholder='eg. Cristiani Arruda' onChangeText={(val) => setParentName(val)}/>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={globalStyles.bold_black_18_karla}>Número do Telefone</Text>
                            <TextInput style={styles.input} placeholder='eg. 62988880000' keyboardType='phone-pad' onChangeText={(val) => setPhoneNumber(val)}/>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={globalStyles.bold_black_18_karla}>Apartamento</Text>
                            <TextInput style={styles.input} placeholder='eg. Apto. 90' onChangeText={(val) => setHouseNumber(val)}/>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={globalStyles.bold_black_18_karla}>Preço(reais)</Text>
                            <TextInput style={styles.input} placeholder='eg. 75' keyboardType='phone-pad' onChangeText={(val) => setPrice(val)}/>
                        </View>
                        <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={createStudent}>
                            <Text style={globalStyles.bold_white_18_karla}>Adicionar</Text>
                        </TouchableOpacity>
                    </View>
                </ViewForm>
            </Modal>
            <RegisterStudentButton onPress={() => setRegisterStudentModal(true)} />
            {/* <GoldButton onPress={handlePress}>Delete</GoldButton> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        paddingHorizontal: 0,
        position: 'relative',
    },
    studentContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 16,
        paddingLeft: 30,
        paddingRight: 55,
        marginHorizontal: 0,
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#BAB273',
        borderBottomWidth: 1,
        marginLeft: 15,
        paddingBottom: 16,
        width: '87%',
    },
    mainInfoContainer: {
        
    },
    aditionalInfoContainer: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',   
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        resizeMode: 'cover',
    },
    imageContainer: {
        paddingBottom: 5,
    },
    modalContainer: {
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 15,
    },
    formContainer: {
        width: '80%',
        marginBottom: 10,
    },
    inputContainer: {
        marginTop: 5,
    },
    input: {
        backgroundColor: '#9A8DD6',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 7,
        fontFamily: 'Karla_700Bold',
        fontSize: 16,
        color: '#FBFAFF',
        marginTop: 0,
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#2DCC69',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 25,
        marginTop: 20,
    },
});