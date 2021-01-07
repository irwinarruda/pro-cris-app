import React from 'react';
import { View, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';

export default function ViewForm(props) {
    function handlePressKeyboard() {
        Keyboard.dismiss();
    }
    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={handlePressKeyboard}  accessible={false}>
                <View style={props.style}>
                    {props.children}
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    );
}