import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import globalStyles from '../components/globalStyles';
import GoldButton from '../components/GoldButton';
import ViewForm from '../components/ViewForm';
import { Entypo } from '@expo/vector-icons'; 
import logo from '../../assets/20200926_165918.jpg';
import { AuthContext } from '../components/AuthProvider';



export default function AddLesson({ navigation }) {
    const { students, studentsAdd, studentsEdit, studentsDelete, studentsDestroy } = React.useContext(AuthContext);

    function handlePress() {
        //studentsDestroy()
        //studentsDelete('4');
        studentsAdd({
            id: '10',
            kidName: 'Irwin Arruda',
            dateObirth: '07/01/2000',
            parentName: 'Cristiani',
            phoneNumber: '(62) 98888-8888',
            houseNumber: '904 torre Sul',
            givenClassesDate: ['07/01', '08/01', '09/01', '10/01'],
            price: 100,      
        })
    }
    return (
        <ViewForm style={styles.container}>
            {/* <Entypo name="dots-three-vertical" size={24} color="#CCC4F2" /> */}
            {students? students.map((student) => (
                <TouchableOpacity key={student.id} style={styles.studentContainer}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={logo} />
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.mainInfoContainer}>
                            <Text style={globalStyles.bold_black_18_karla}>{student.kidName}</Text>
                            <Text style={globalStyles.bold_black_14_karla}>{student.houseNumber}</Text>
                        </View>
                        <View style={styles.aditionalInfoContainer}>
                            <Text style={globalStyles.bold_black_12_karla}>A.D.: {student.givenClassesDate.length}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )): null}
            <GoldButton onPress={handlePress}>Delete</GoldButton>
        </ViewForm>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        paddingHorizontal: 40,
    },
    studentContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
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
    }
});