import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function UserConfig({navigation}) {
    return (
        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Text>UserConfig</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text>Navigate to Home</Text>
            </TouchableOpacity>
        </View>
    );
}