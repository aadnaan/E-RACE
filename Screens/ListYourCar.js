import React, {Component} from 'react';
import {Text,TextInput,StyleSheet,View ,ImageBackground,Platform,ScrollView,Image} from 'react-native';
import Cards from '../Components/Cards';
import { Rating } from 'react-native-elements';
import { StrictMode } from 'react';
import {Button as Button2} from 'native-base';
import {Text as Text1} from 'native-base';
export default class ListYourCar extends Component{

    componentDidMount(){
       
    }

    render()
    {
        
        return(
               
                        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                            <ImageBackground style={{width:'100%',height:'100%'}}source={require('../assets/CarListScreen.jpeg')} blurRadius={1.5}>
                                <View style={{alignItems:'center', justifyContent:'center',marginTop:130}}>
                                <Text style={styles.Heading}>LIST YOUR CAR</Text>
                                <View style={{alignItems:'center', justifyContent:'center'}}>
                                <Text style={styles.Heading2}>Here you can list your vehicle for rent and find a trustable customer from our active market</Text>
                                </View>
                                <Button2 primary >
                                    <Text1>Get Started</Text1>
                                </Button2>
                                </View>
                            </ImageBackground>
                        </View>

                 
            
        );
    }
}
const styles=StyleSheet.create({
    Heading:{
        paddingTop:15,
        paddingBottom:8,
        fontSize:30,
        fontWeight:'900',
        color:'white',
        textShadowColor:'black',
        textShadowRadius:10,

    },
    Heading2:{
        paddingTop:7,
        paddingBottom:8,
        fontSize:15,
        fontWeight:'900',
        color:'white',
        textShadowColor:'black',
        textShadowRadius:10,
        alignSelf:'center',
        textAlign: 'center'

    }
       
    

});