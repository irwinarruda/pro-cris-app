import React from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';

export default function ViewFormLogin(props) {
    function handlePressKeyboard() {
        Keyboard.dismiss();
    }
    return (
        <TouchableWithoutFeedback onPress={handlePressKeyboard}  accessible={false}>
            <View style={props.style}>
                {props.children}
            </View>
        </TouchableWithoutFeedback>
    );
}