import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Modal, TextInput, ScrollView, FlatList } from 'react-native';
import globalStyles from '../components/globalStyles';
import GreenButton from '../components/GreenButton';
import RedButton from '../components/RedButton';
import ViewForm from '../components/ViewForm';
import { AntDesign } from '@expo/vector-icons'; 
import logo from '../../assets/18151751060402.jpg';
import { AuthContext } from '../components/AuthProvider';
import RegisterStudentButton from '../components/RegisterStudentButton';

export default function AddLesson({ navigation }) {
    const [registerStudentModal, setRegisterStudentModal] = React.useState(false);
    const [addNewClassModal, setAddNewClassModal] = React.useState(false);
    const [addNewClassModalInfo, setAddNewClassModalInfo] = React.useState({});
    const [date, setDate] = React.useState('');
    const [kidName, setKidName] = React.useState('');
    const [dateBirth, setDateBirth] = React.useState('');
    const [parentName, setParentName] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [houseNumber, setHouseNumber] = React.useState('');
    const [price, setPrice] = React.useState('');

    const { students, studentsAdd, studentsEdit, studentsDelete, studentsDestroy } = React.useContext(AuthContext);

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

    function handleStudentPress(studentObj) {
        let date = new Date().getDate();
        let month = new Date().getMonth() + 1;
        setDate(date + '/' + month);
        setAddNewClassModal(true);
        setAddNewClassModalInfo(studentObj);
    }

    function addDateToStudent() {
        let studentObjInfo = addNewClassModalInfo;
        studentObjInfo.givenClasses.push(date);
        studentsEdit(studentObjInfo);
        setAddNewClassModal(false);
    }
    return (
        <View style={styles.container}>
            {students? (<FlatList 
                data={students}
                renderItem={({item}) => (
                    <TouchableOpacity style={styles.studentContainer} onPress={() => handleStudentPress(item)}>
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

            <Modal visible={addNewClassModal} animationType='slide' transparent={true}>
                <ViewForm style={styles.addClassContainer}>
                    <View style={styles.addClassBoxContainer}>
                        <View style={styles.addClassInfoContainer}>
                            <Text style={globalStyles.bold_black_18_karla}>Adicionar aula para:</Text>
                            <Text style={globalStyles.bold_black_16_karla}>{addNewClassModalInfo.kidName}</Text>
                            <TextInput style={[styles.input, {marginTop: 10, paddingVertical: 2, paddingHorizontal: 10, textAlign: 'center'}]} placeholder='eg. 17/10' keyboardType='phone-pad' defaultValue={date} onChangeText={(val) => setDate(val)}/>
                        </View>
                        <View style={styles.addClassButtonContainer}>
                            <GreenButton onPress={addDateToStudent}>Adicionar</GreenButton>
                            <RedButton onPress={() => setAddNewClassModal(false)}>Fechar</RedButton> 
                        </View>     
                    </View>
                </ViewForm>
            </Modal>


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
    /*Container dos alunos*/
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
    /*Container dos alunos*/

    /*Modal de adacionar alunos*/
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
    /*Modal de adacionar alunos*/

    /*Modal do box de adicionar aula*/
    addClassContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    addClassBoxContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 170,
        width: 300, 
        paddingVertical: 15,
        shadowColor: "#000",
        borderColor: '#CCC591',
        borderWidth: 2,
        borderRadius: 10,
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    addClassInfoContainer: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
    },
    addClassButtonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
    }
    /*Modal do box de adicionar aula*/
});