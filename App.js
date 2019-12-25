import React,{useState} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Home from "./Screens/Home"
import MainNavigator from "./Navigation/MainNavigator"
import * as Font from 'expo-font';
import { AppLoading } from 'expo';


const fetchFonts = () => {
  return Font.loadAsync({
    'Modern-Machine': require('./assets/fonts/Modern Machine.ttf'),
    'Patchwork-Color': require('./assets/fonts/PatchworkStitchlingsColor.ttf'),
    'Patchwork': require('./assets/fonts/PatchworkStitchlings.ttf'),
    'Seagram': require('./assets/fonts/Seagram.ttf'),
    'Roboto_medium':require('./assets/fonts/Roboto-Medium.ttf'),
  });


};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

      if(!dataLoaded){
      return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {

          setDataLoaded(true);
        }}
        onError={(err) => console.log(err)}
      />
    );
  }   
      if(dataLoaded==true){
      return (
      <MainNavigator/>
    );
    }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});