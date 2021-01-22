import React from 'react';
import { View } from 'react-native';
import { AuthContext } from '../components/AuthProvider';

export default function LogoutScreen() {
    const { userLogout } = React.useContext(AuthContext);
    React.useEffect(() => {
        userLogout();
    }, []);
    return(
        <View></View>
    );
}