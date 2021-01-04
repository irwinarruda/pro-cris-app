import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../components/AuthProvider';
import GoldButton from '../components/GoldButton';
import ViewForm from '../components/ViewForm';
//import { Entypo } from '@expo/vector-icons'; 

export default function StudentsAddLesson() {
    const { students, studentsAdd, studentsEdit, studentsDelete } = React.useContext(AuthContext);
    function handlePress() {
        //navigation.navigate('RemoveLesson');
        studentsAdd({
            id: '1',
            kidName: 'Irwin',
            dateObirth: '17/10/2006',
            parentName: 'Cristiani',
            phoneNumber: '(62) 98888-8888',
            houseNumber: '904 torre Sul',
            givenClassesDate: ['07/01', '08/01', '09/01', '10/01'],
            price: 100,      
        });
        //studentsDelete('2');
    }

    return (
        <ViewForm style={styles.container}>
            {/* <Entypo name="dots-three-vertical" size={24} color="#CCC4F2" /> */}
            {students.map((student) => (
                <View key={student.id}>
                    <Text>{student.kidName}</Text>
                </View>
            ))}
            <GoldButton onPress={handlePress}>Entrar</GoldButton>
        </ViewForm>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});
