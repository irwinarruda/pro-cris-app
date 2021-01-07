import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Modal, TextInput, FlatList, Alert, Dimensions } from 'react-native';
import GreenButton from '../components/GreenButton';
import RedButton from '../components/RedButton';
import globalStyles from '../components/globalStyles';
import ViewForm from '../components/ViewForm';
import { AntDesign } from '@expo/vector-icons'; 
import icon from '../../assets/18151751060402.jpg';
import { AuthContext } from '../components/AuthProvider';
import { Entypo } from '@expo/vector-icons'; 
import logo from '../../assets/pro-cris-b.png';

export default function RemoveLesson() {
    const [studentInfoModal, setStudentInfoModal] = React.useState(false);
    const [studentInfo, setStudentInfo] = React.useState({});
    const [saldo, setSaldo] = React.useState(0);
    const [saldoStatus, setSaldoStatus] = React.useState(false);
    const [lessonsArr, setLessonsArr] = React.useState({});
    const [lessonsArrModal, setLessonsArrModal] = React.useState(false);
    const [singleStudentArr, setSingleStudentArr] = React.useState([]);

    const { students, studentsEdit, studentsDelete } = React.useContext(AuthContext);

    function handleStudentInfoPress(studentObj) {
        setStudentInfo(studentObj);
        setStudentInfoModal(true);
    }

    function handleStudentPress(studentObj) {
        setLessonsArr(studentObj);
        setSingleStudentArr(studentObj.givenClasses);
        setLessonsArrModal(true);
    }

    function editStudent() {
        let newStudentInfo = {...studentInfo};
        setStudentInfoModal(false);
        studentsEdit(newStudentInfo);
        Alert.alert('Editar Aluno', 'Aluno Editado com sucesso');
    }

    function removeStudent() {
        Alert.alert(
            'REMOVER ALUNO',
            'Certeza que deseja remover esse aluno?',
            [
                {
                    text: "Sim",
                    onPress: () => {
                        let newStudentInfo = {...studentInfo};
                        setStudentInfoModal(false);
                        studentsDelete(newStudentInfo);
                        Alert.alert('Remover Aluno', 'Aluno removido com sucesso');
                    }
                },
                {
                    text: "NÃO",
                    onPress: () => null,
                    style: "cancel"
                },
            ]
        );  
    }

    function removeArr() {
        Alert.alert(
            'Deletar Aulas',
            'Deseja deletar as aulas dadas dos seu aluno?',
            [
                {
                    text: "Sim",
                    onPress: () => {
                        let newStudentInfo = {...lessonsArr};
                        newStudentInfo.givenClasses = [];
                        setLessonsArrModal(false);
                        studentsEdit(newStudentInfo);
                    }
                },
                {
                    text: "NÃO",
                    onPress: () => null,
                    style: "cancel"
                },
            ]
        );      
    }

    function removeSingeItemArr(singleItem) {
        Alert.alert(
            'Deletar Única Aula',
            'Deseja deletar essa única aula do aluno?',
            [
                {
                    text: "Sim",
                    onPress: () => {
                        let newStudentInfo = {...lessonsArr};
                        let newArr = []
                        var onlyOneOutCheck = false;
                        for(let i = 0; i < singleStudentArr.length; i++) {       
                            if(singleItem === singleStudentArr[i] && onlyOneOutCheck === false) {
                                onlyOneOutCheck = true;
                            } else {
                                newArr.push(singleStudentArr[i]);
                            }
                        }
                        newStudentInfo.givenClasses = newArr;
                        setSingleStudentArr(newArr);
                        studentsEdit(newStudentInfo);
                    }
                },
                {
                    text: "NÃO",
                    onPress: () => null,
                    style: "cancel"
                },
            ]
        );   
    }
    
    function priceHandler() {
        setSaldo(0);
        let sum = 0;
        students.map((item) => {
            if(Number(item.price) && item.givenClasses) {
                sum += item.givenClasses.length * Number(item.price);
            }
        });
        setSaldo(sum);
        setSaldoStatus(!saldoStatus);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={priceHandler}>
                {saldoStatus?
                (<View style={styles.saldoContainer}><Text style={globalStyles.bold_black_18_karla}>Saldo: {saldo? saldo: null}</Text></View>)
               :(<View style={styles.saldoContainer}><Text style={globalStyles.bold_black_18_karla}>Saldo: </Text><AntDesign name="caretup" size={18} color="#353440" /></View>)}
            </TouchableOpacity>
            {students? (<FlatList 
                data={students}
                renderItem={({item}) => (
                    <TouchableOpacity style={styles.studentContainer} onPress={() => handleStudentPress(item)}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={icon} />
                        </View>
                        <View style={styles.infoContainer}>
                            <View style={styles.mainInfoContainer}>
                                <Text style={globalStyles.bold_black_18_karla}>{item.kidName}</Text>
                                <Text style={globalStyles.bold_black_14_karla}>{item.parentName}: {item.phoneNumber}</Text>
                                <Text style={globalStyles.bold_black_12_karla}>Aulas Dadas: {item.givenClasses.length}</Text>
                            </View>
                            <View style={styles.aditionalInfoContainer}>
                                <TouchableOpacity activeOpacity={0.4} style={styles.aditionalInfoIcon} onPress={() => handleStudentInfoPress(item)}>
                                    <Entypo name="dots-three-vertical" size={24} color="#BAB273" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>)}
                keyExtractor={(item) => item.id}
            />): null}
            <Modal visible={lessonsArrModal} animationType='slide' transparent={true}>
                <ViewForm style={styles.lessonsArrContainer}>
                    <View style={styles.lessonsArrBoxContainer}>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Image style={styles.logoImagePrint} source={logo} />
                            <Text style={[globalStyles.bold_black_18_karla, {marginTop: -10,}]}>Aulas dadas para o Aluno: </Text>
                            <Text style={globalStyles.bold_black_18_karla}>{lessonsArr.kidName}</Text>
                        </View>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap'}}>
                            {singleStudentArr?singleStudentArr.map((item) => {
                                var precision = 10000; 
                                var randomnum = (Math.floor(Math.random() * (10 * precision - 1 * precision) + 1 * precision) / (1*precision)).toString();
                                return (
                                    <TouchableOpacity style={styles.datasBox}  activeOpacity={0.5} onPress={() => removeSingeItemArr(item)} key={randomnum} >
                                        <Text style={[globalStyles.bold_white_18_karla]} >
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            }): null}
                        </View>
                        <View style={styles.lessonsArrButtonContainer}>
                            <GreenButton onPress={removeArr}>Pago</GreenButton>
                            <RedButton onPress={() => setLessonsArrModal(false)}>Fechar</RedButton> 
                        </View>  
                    </View>
                </ViewForm>
            </Modal>
            <Modal visible={studentInfoModal} animationType='slide' transparent={false}>
                <ViewForm style={styles.changeInfoContainer}>
                    <TouchableOpacity onPress={() => setStudentInfoModal(false)} activeOpacity={0.3}>
                        <AntDesign name="closecircleo" size={50} color="#BAB273" />
                    </TouchableOpacity> 
                    <Text style={globalStyles.bold_black_18_karla}>Modificar Aluno</Text>
                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <Text style={globalStyles.bold_black_18_karla}>Nome do Aluno</Text>
                            <TextInput style={styles.input} placeholder='eg. Cassiel Arruda' autoCapitalize='none' defaultValue={studentInfo.kidName} onChangeText={(val) => setStudentInfo({...studentInfo, kidName: val})}/>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={globalStyles.bold_black_18_karla}>Data de Nascimento</Text>
                            <TextInput style={styles.input} placeholder='eg. 17/10/2006' keyboardType='phone-pad' defaultValue={studentInfo.dateBirth} onChangeText={(val) => setStudentInfo({...studentInfo, dateBirth: val})}/>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={globalStyles.bold_black_18_karla}>Nome do Responsável</Text>
                            <TextInput style={styles.input} placeholder='eg. Cristiani Arruda' defaultValue={studentInfo.parentName} onChangeText={(val) => setStudentInfo({...studentInfo, parentName: val})}/>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={globalStyles.bold_black_18_karla}>Número do Telefone</Text>
                            <TextInput style={styles.input} placeholder='eg. 62988880000' keyboardType='phone-pad' defaultValue={studentInfo.phoneNumber} onChangeText={(val) => setStudentInfo({...studentInfo, phoneNumber: val})}/>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={globalStyles.bold_black_18_karla}>Apartamento</Text>
                            <TextInput style={styles.input} placeholder='eg. Apto. 90' defaultValue={studentInfo.houseNumber} onChangeText={(val) => setStudentInfo({...studentInfo, houseNumber: val})}/>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={globalStyles.bold_black_18_karla}>Preço(reais)</Text>
                            <TextInput style={styles.input} placeholder='eg. 75' keyboardType='phone-pad' defaultValue={studentInfo.price} onChangeText={(val) => setStudentInfo({...studentInfo, price: val})}/>
                        </View>
                        <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={editStudent}>
                            <Text style={globalStyles.bold_white_18_karla}>Salvar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 15,}} activeOpacity={0.7} onPress={removeStudent}>
                            <Text style={globalStyles.bold_black_14_karla}>Remover Aluno</Text>
                        </TouchableOpacity>
                    </View>
                    
                </ViewForm>
            </Modal>
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
        marginTop: 10,
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
        paddingBottom: 10,
        width: '87%',
    },
    aditionalInfoIcon: {
        paddingLeft: 7,
        paddingRight: 0,
        paddingVertical: 10,
        //backgroundColor: 'tomato',
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

    /*Container Saldo*/
    saldoContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: 310,
        paddingVertical: 5,
        borderBottomWidth: 2,
        borderBottomColor: '#BAB273',
    },
    /*Container Saldo*/

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

    /*Modal do box editar alunos*/
    changeInfoContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    changeInfoBoxContainer: {
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
    /*Modal do box editar alunos*/
    /*Modal box de aulas*/
    lessonsArrContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    lessonsArrBoxContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 350,
        width: Dimensions.get('window').width,
        marginTop: '29%',
        paddingBottom: 15,
        shadowColor: "#000",
        borderColor: '#CCC591',
        borderWidth: 4,
        borderRadius: 10,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    lessonsArrButtonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
    },
    /*Modal box de aulas*/
    logoImagePrint: {
        width: 90,
        resizeMode: 'contain',
        marginBottom: 0,
    },
    datasBox: {
        backgroundColor: '#9A8DD6', 
        borderRadius: 5, 
        marginHorizontal: 2, 
        marginBottom: 3, 
        paddingVertical: 2, 
        paddingHorizontal: 3,
    }
});