import React, {Component} from 'react';
import {View,StyleSheet,Text} from 'react-native';

export default class Cards extends Component{
    render()
    {   return(
            <View style={{...styles.card,...this.props.style}}>
                {this.props.children}
             </View>
        );
    }   
}
const styles=StyleSheet.create({
    card:{
        elevation:10,
        backgroundColor:'white',
        borderRadius:10,
    },

});