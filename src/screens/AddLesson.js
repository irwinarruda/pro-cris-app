import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import globalStyles from '../components/globalStyles';
import GoldButton from '../components/GoldButton';
import ViewForm from '../components/ViewForm';
import { Entypo } from '@expo/vector-icons'; 

export default function AddLesson({ navigation }) {
    function handlePress() {
        navigation.navigate('RemoveLesson');
    }
    return (
        <ViewForm style={styles.container}>
            {/* <Entypo name="dots-three-vertical" size={24} color="#CCC4F2" /> */}
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