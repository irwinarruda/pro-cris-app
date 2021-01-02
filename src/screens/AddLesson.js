import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import globalStyles from '../components/globalStyles';
import GoldButton from '../components/GoldButton';
import ViewForm from '../components/ViewForm';
//import {  } from ''

export default function AddLesson({ navigation }) {
    function handlePress() {
        navigation.navigate('RemoveLesson');
    }
    return (
        <ViewForm style={styles.container}>
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