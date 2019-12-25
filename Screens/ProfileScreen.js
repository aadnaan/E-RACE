import React, {Component} from 'react';
import {Text,TextInput,StyleSheet,View ,ImageBackground,Platform,ScrollView,Image} from 'react-native';
import Cards from '../Components/Cards';
import { Rating } from 'react-native-elements';
import { StrictMode } from 'react';

export default class ProfileScreen extends Component{

    componentDidMount(){
       
    }

    render()
    {
        
        return(
               
                        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                            <Text>Profile</Text>
                        </View>

                
            
        );
    }
}
const styles=StyleSheet.create({
    card:{
        
    },
       
    

});