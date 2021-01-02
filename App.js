import React from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts, Yellowtail_400Regular } from '@expo-google-fonts/yellowtail';
import { Karla_400Regular, Karla_700Bold, } from '@expo-google-fonts/karla';
import AddLesson from './src/screens/AddLesson';
import RemoveLesson from './src/screens/RemoveLesson';

export default function App() {
  const [isloged, setIsloged] = React.useState(false);
  const [fontsLoaded] = useFonts({
    Yellowtail_400Regular,
    Karla_400Regular,
    Karla_700Bold
  });
  console.log(isloged);
  
  if(!fontsLoaded) {
    return (
      <AppLoading />
    );
  } else {
    <AddLesson setValue={setIsloged}/>
  }
}