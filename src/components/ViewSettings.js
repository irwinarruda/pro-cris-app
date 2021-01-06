import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { AuthContext } from '../components/AuthProvider';

export default function ViewForm(props) {
    const { settingsActive, settingsChange, idonoClose} = React.createContext(AuthContext);
    function handleSettingsPressOut() {
        if(settingsActive) {
            settingsChange(false);
        }
    }
    return (
        <TouchableWithoutFeedback onPress={handleSettingsPressOut}  accessible={false}>
            <View style={props.style}>
                {props.children}
            </View>
        </TouchableWithoutFeedback>
    );
}