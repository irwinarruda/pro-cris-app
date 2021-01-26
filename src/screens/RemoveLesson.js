import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Modal, TextInput, FlatList, Alert, Dimensions } from 'react-native';
import GreenButton from '../components/Buttons/GreenButton';
import RedButton from '../components/Buttons/RedButton';
import globalStyles from '../components/globalStyles';
import ViewForm from '../components/Views/ViewForm';
import { AntDesign } from '@expo/vector-icons'; 
import icon from '../../assets/18151751060402.jpg';
import { AuthContext } from '../components/AuthProvider';
import { Entypo } from '@expo/vector-icons'; 
import logo from '../../assets/pro-cris-b.png';
import randomKeyGenerator from '../components/randomKeyGenerator';
import { splitSlashes, insertSlashes } from '../components/slashesHandler';

export default function RemoveLesson() {
    const [studentSettingsModal, setStudentSettingsModal] = React.useState(false);
    const [lessonsArrModal, setLessonsArrModal] = React.useState(false);
    const [studentInfo, setStudentInfo] = React.useState({
        id: '',
        kidName: '',
        dateBirth: '',
        parentName: '',
        phoneNumber: '',
        houseNumber: '',
        givenClasses: [],
        price: '',
    });
    const [studentInfoDateBackHandler, setStudentInfoDateBackHandler] = React.useState('');
    const [singleStudentArr, setSingleStudentArr] = React.useState([]);
    const [saldo, setSaldo] = React.useState(0);
    const [saldoStatus, setSaldoStatus] = React.useState(false);

    const { students, studentsEdit, studentsDelete } = React.useContext(AuthContext);

    React.useEffect(() => {
        let nowDateBirth = studentInfo.dateBirth;
        if(nowDateBirth.length >= studentInfoDateBackHandler.length) {
            setStudentInfoDateBackHandler(nowDateBirth);
            if(nowDateBirth.length === 2 || nowDateBirth.length === 5) {
                setStudentInfo({ ...studentInfo, dateBirth: nowDateBirth + '/' });
                return;
            }

            let onlyDateBirth = splitSlashes(nowDateBirth, '/');
            if(onlyDateBirth.length > 7) {
                setStudentInfo({ ...studentInfo, dateBirth: insertSlashes(onlyDateBirth) });
            }
        } else {
            setStudentInfoDateBackHandler(nowDateBirth);
        }
    }, [studentInfo.dateBirth])

    function handleStudentInfoPress(studentObj) {
        setStudentInfo(studentObj);
        setStudentSettingsModal(true);
    }

    function handleStudentPress(studentObj) {
        setStudentInfo(studentObj);
        setSingleStudentArr(studentObj.givenClasses);
        setLessonsArrModal(true);
    }

    function editStudent() {
        let newStudentInfo = {...studentInfo};
        setStudentSettingsModal(false);
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
                        setStudentSettingsModal(false);
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
            'Deseja deletar as aulas dadas para esse aluno?',
            [
                {
                    text: "Sim",
                    onPress: () => {
                        let newStudentInfo = {...studentInfo};
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
                        let newStudentInfo = {...studentInfo};
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
                (<View style={styles.saldoContainer}><Text style={globalStyles.bold_black_18_karla}>Saldo: {saldo? saldo: 0}</Text></View>)
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
                                <View style={{width: Dimensions.get('window').width}}>
                                    <Text style={globalStyles.bold_black_18_karla}>{item.kidName}</Text>
                                    <Text style={globalStyles.bold_black_14_karla}>{item.parentName}: {item.phoneNumber}</Text>
                                    <Text style={globalStyles.bold_black_12_karla}>Aulas Dadas: {item.givenClasses.length}</Text>
                                </View>
                            </View>
                            <TouchableOpacity activeOpacity={0.4} style={styles.aditionalInfoIcon} onPress={() => handleStudentInfoPress(item)}>
                                <Entypo name="dots-three-vertical" size={24} color="#BAB273" />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>)}
                keyExtractor={(item) => item.id}
            />): null}
            <Modal visible={lessonsArrModal} animationType='slide' transparent={true} onRequestClose={() => setLessonsArrModal(false)}>
                <ViewForm style={styles.lessonsArrContainer}>
                    <View style={styles.lessonsArrBoxContainer}>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Image style={styles.logoImagePrint} source={logo} />
                            {singleStudentArr.length !== 1? 
                            <Text style={[globalStyles.bold_black_18_karla, {marginTop: -10,}]}>{singleStudentArr.length} aulas dadas para o(a) Aluno(a): </Text>: 
                            <Text style={[globalStyles.bold_black_18_karla, {marginTop: -10,}]}>1 aula dada para o(a) Aluno(a): </Text>}
                            <Text style={globalStyles.bold_black_18_karla}>{studentInfo.kidName}</Text>
                        </View>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap'}}>
                            {singleStudentArr?singleStudentArr.map((item) => {
                                var randomnum = randomKeyGenerator();
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
            <Modal visible={studentSettingsModal} animationType='slide' transparent={false} onRequestClose={() => setStudentSettingsModal(false)}>
                <ViewForm style={styles.modalContainer}>
                    <TouchableOpacity onPress={() => setStudentSettingsModal(false)} activeOpacity={0.3}>
                        <AntDesign name="closecircleo" size={50} color="#BAB273" />
                    </TouchableOpacity> 
                    <Text style={[globalStyles.bold_black_18_karla, {marginBottom: 5}]}>Modificar Aluno</Text>
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
        width: '85%',
    },
    aditionalInfoIcon: {
        paddingVertical: 20,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-start', 
        width: '15%', 
    },  
    mainInfoContainer: {
        overflow: 'hidden',
        width: '85%',
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

    /*Modal de modificar*/
    modalContainer: {
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 30,
    },
    formContainer: {
        width: '85%',
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
    /*Modal de modificar*/
    /*Modal box de aulas*/
    lessonsArrContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: '12%',
    },
    lessonsArrBoxContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        minHeight: 310,
        maxHeight: 380,
        width: Dimensions.get('window').width,
        marginTop: '29%',
        paddingBottom: 15,
        shadowColor: "#000",
        borderColor: '#CCC591',
        borderWidth: 6,
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
        marginTop: 50,
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