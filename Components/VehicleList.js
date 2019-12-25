import React, {Component} from 'react';
import {Text,TextInput,StyleSheet,View ,ImageBackground,Platform,ScrollView,Image} from 'react-native';
import Cards from '../Components/Cards';
import { Rating } from 'react-native-elements';
import { StrictMode } from 'react';

export default class VehicleList extends Component{

    componentDidMount(){
        const {imageuri} = this.props;
    }

    render()
    {
        const {imageuri} = this.props;
        return(
                <Cards  style={{height:220, width:200,overflow:"hidden",alignItems:'center',marginLeft:10,marginTop:10}}>
                        <View style={{height:150, width:230,alignItems:'center',justifyContent:'center'}}>
                            <ImageBackground source={{uri:imageuri}} resizeMode={"contain"} style={{width:190,height:140}} />

                           

                        </View>
                        <View style={{marginTop:10,height:30, width:230,flexDirection : "row",marginLeft:30}}>
                            <Text style={{ fontSize: 15, fontWeight: '500', paddingHorizontal: 5 }}>
                                {this.props.name} <Text>{this.props.Model}</Text>
                            </Text>
                            <Text style={{ fontSize: 12, fontWeight: '700', paddingHorizontal: 5 , paddingTop:3}}>
                            {this.props.year}
                            </Text>

                        </View>
                        <View style={{height:35, width:230,alignItems:'flex-start',marginLeft:35}}>
                            <Rating type={"custom"} ratingColor={"#800080"} startingValue={this.props.rating} imageSize={20} ratingCount={5}/>

                        </View>

                </Cards>
            
        );
    }
}
const styles=StyleSheet.create({
    card:{
        
    },
       
    

});