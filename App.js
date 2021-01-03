import { useFonts, Yellowtail_400Regular } from '@expo-google-fonts/yellowtail';
import { Karla_400Regular, Karla_700Bold, } from '@expo-google-fonts/karla';
import React from 'react';
import AppLoading from 'expo-app-loading';
import Routes from './src/routes/Routes';
import { AuthProvider } from './src/components/AuthProvider';


export default function App() {
  const [fontsLoaded] = useFonts({
    Yellowtail_400Regular,
    Karla_400Regular,
    Karla_700Bold
  });
  
  if(!fontsLoaded) {
    return (
      <AppLoading />
    );
  } else {
    return (
      <AuthProvider>
        <Routes />
      </AuthProvider>
    );
  }
}