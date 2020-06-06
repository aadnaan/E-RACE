import React, {Component} from 'react';
import {Text,TextInput,StyleSheet,View ,ImageBackground,Platform,ScrollView,Image, TouchableHighlight} from 'react-native';
import Cards from '../Components/Cards';
import { Rating } from 'react-native-elements';
import { StrictMode } from 'react';
import { MaterialCommunityIcons,FontAwesome5,FontAwesome,Ionicons,MaterialIcons, AntDesign,Entypo } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import Counter from "react-native-counters";
import Feather from 'react-native-vector-icons/Feather';

import { Button } from 'react-native-elements'
const minusIcon = (isMinusDisabled, touchableDisabledColor, touchableColor) => {
    return <Feather name='minus' size={20} color={isMinusDisabled ? touchableDisabledColor : touchableColor} />
  };
  
  const plusIcon = (isPlusDisabled, touchableDisabledColor, touchableColor) => {
    return <Feather name='plus' size={20} color={isPlusDisabled ? touchableDisabledColor : touchableColor} />
  };
export default class BookingDetails extends Component{
    constructor(props) {
        super(props);
        this.state = {
            checked:'Cash',
            AdditionalMiles:0,
        };
    }

    componentDidMount(){      
    }
    
    async onChange(number, type) {
       await this.setState({
            AdditionalMiles:number
        })
    }


    render()
    {
    const { checked } = this.state;
    let bookingDetails=this.props.navigation.state.params;
    const imageUri=bookingDetails.URL[0];
        
    return(
        <View style={{flex:1}}>
        <ScrollView style={{flex:0.96}}>
        <View style={{flex:1}}>
            <Cards style={{margin:10,padding:10}}>
                <View style={{flexDirection:'row'}}>
                    <View style={{marginLeft:5,width:'55%'}}>
                        <Text style={{fontSize:16,fontWeight:'500'}}>{bookingDetails.Lister}</Text>
                        <Text style={{fontSize:20,fontWeight:'700'}}>{bookingDetails.Brand} <Text style={{fontSize:18,fontWeight:'600'}}>{bookingDetails.Model} </Text><Text style={{fontSize:18,fontWeight:'600'}}>{bookingDetails.Variant}</Text></Text>
                        <View style={{flexDirection:'row'}}>
                            <View style={{marginTop:4}}>
                            <Rating type={"custom"} startingValue={bookingDetails.Rating} ratingColor={"#800080"}  imageSize={15} ratingCount={5}/>
                            </View>
                            <View style={{marginLeft:8}}>
                            <Text style={{fontSize:15,fontWeight:'500'}}>{bookingDetails.NoOfTrips} <Text style={{fontSize:14,fontWeight:'500'}}>Trips</Text></Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Entypo name="location" color={'#800080'} size={20} style={{marginLeft:5,marginTop:10}} />
                            <View style={{marginTop:12,marginLeft:6}}>
                            <Text>{bookingDetails.Pickup}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{marginRight:5,alignSelf:'flex-start',width:'45%',borderRadius:10}}>
                        <Image style={{width: '100%', height: 100}} resizeMode='contain' source={{uri:imageUri}}/>
                    </View>
                </View>
            </Cards>
            <Cards style={{margin:10,padding:10}}>
                <View style={{}}>
                    <Text style={{fontSize:16,fontWeight:'500'}}>Trip Dates</Text>
                    <View style={{flexDirection:"row",justifyContent:"space-evenly",marginTop:8}}>
                        <View style={{alignItems:"center"}}>
                            <Text style={{fontSize:18,fontWeight:'600',color:'grey'}}>{bookingDetails.startMonth} <Text>{bookingDetails.startDay}</Text></Text>
                            <Text style={{fontSize:15,fontWeight:'500',color:'grey'}}>10:00<Text> AM</Text></Text>
                        </View>
                        <Entypo name="arrow-right" color={'#800080'} size={25} style={{marginLeft:5,marginTop:10}} />
                        <View style={{alignItems:"center"}}>
                            <Text style={{fontSize:18,fontWeight:'600',color:'grey'}}>{bookingDetails.endMonth} <Text>{bookingDetails.endDay}</Text></Text>
                            <Text style={{fontSize:15,fontWeight:'500',color:'grey'}}>10:00<Text> AM</Text></Text>
                        </View>
                    </View>
                </View>
            </Cards>
            <Cards style={{margin:10,padding:30}}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontSize:16,fontWeight:'600',color:'grey'}}>Trip Price</Text>
                    <Text style={{fontSize:16,fontWeight:'600',color:'grey'}}>Rs.<Text>{bookingDetails.RatePerDay}<Text>/day</Text></Text></Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
                    <Text style={{fontSize:16,fontWeight:'600',color:'grey'}}>Trip Free</Text>
                    <Text style={{fontSize:16,fontWeight:'600',color:'grey'}}>Rs.<Text>{bookingDetails.TripFee}<Text>/day</Text></Text></Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
                    <Text style={{fontSize:16,fontWeight:'600'}}>Trip Total</Text>
                    <Text style={{fontSize:16,fontWeight:'600'}}>Rs.<Text>{parseInt(bookingDetails.RatePerDay)+parseInt(bookingDetails.TripFee)}<Text>/day</Text></Text></Text>
                </View>
            </Cards>
            <Cards style={{margin:10,padding:30}}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontSize:16,fontWeight:'600'}}>Additional Miles</Text>
                    <Counter start={0} max={1000} textColor="grey" touchableColor="#800080" touchableDisabledColor= "#800080" minusIcon={minusIcon} plusIcon={plusIcon} onChange={this.onChange.bind(this)} />
                </View>
            </Cards>
            <Cards style={{margin:10,padding:30,backgroundColor:'#ece9e9'}}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontSize:16,fontWeight:'600',color:'grey'}}>{bookingDetails.daysCalculated}<Text>-day trip</Text></Text>
                    <Text style={{fontSize:16,fontWeight:'600',color:'grey'}}>Rs.<Text>{bookingDetails.daysCalculated*(parseInt(bookingDetails.RatePerDay)+parseInt(bookingDetails.TripFee))}</Text></Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
                    <Text style={{fontSize:16,fontWeight:'600',color:'grey'}}>500<Text> total miles</Text></Text>
                    <Text style={{fontSize:16,fontWeight:'600',color:'grey'}}>Free</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
                    <Text style={{fontSize:16,fontWeight:'600',color:'grey'}}>{this.state.AdditionalMiles}<Text>-Additional miles</Text></Text>
                    <Text style={{fontSize:16,fontWeight:'600',color:'grey'}}>{this.state.AdditionalMiles}x{bookingDetails.AdditionalMilePrice}={this.state.AdditionalMiles*bookingDetails.AdditionalMilePrice}</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
                    <Text style={{fontSize:16,fontWeight:'600'}}>Trip Total</Text>
                    <Text style={{fontSize:16,fontWeight:'600'}}>Rs.<Text style={{fontSize:16,fontWeight:'500'}}>{(this.state.AdditionalMiles*bookingDetails.AdditionalMilePrice)+(bookingDetails.daysCalculated*(parseInt(bookingDetails.RatePerDay)+parseInt(bookingDetails.TripFee)))}</Text></Text>
                </View>
            </Cards>
            <Cards style={{margin:10,padding:10,backgroundColor:'#ece9e9'}}>
                <View style={{}}>
                    <Text style={{fontSize:16,fontWeight:'500'}}>Payment Method</Text>
                    <View style={{paddingHorizontal:20,paddingVertical:10}}>
                    <View style={{}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row'}}>
                    <MaterialCommunityIcons name="cash-multiple" color={'#800080'} size={25} style={{marginRight:8}} />
                    <Text style={{fontSize:16,fontWeight:'600',color:'grey',marginTop:3}}>Cash</Text>
                    </View>
                    <RadioButton
                        uncheckedColor="#800080"
                        color="#800080"
                        value="Cash"
                        status={checked === 'Cash' ? 'checked' : 'unchecked'}
                        onPress={() => { this.setState({ checked: 'Cash' }); }}
                    />
                    </View>
                    {this.state.checked == 'Cash'? <Text>Entire fee will be paid before the trip</Text>: null }
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row'}}>
                    <MaterialCommunityIcons name="credit-card" color={'#800080'} size={25} style={{marginRight:8}} />
                    <Text style={{fontSize:16,fontWeight:'600',color:'grey',marginTop:3}}>Credit/Debit</Text>
                    </View>
                    <RadioButton
                        disabled={true}
                        value="Credit/Debit"
                        uncheckedColor="#800080"
                        color="#800080"
                        status={checked === 'Credit/Debit' ? 'checked' : 'unchecked'}
                        onPress={() => { this.setState({ checked: 'Credit/Debit' }); }}
                    />
                    </View>
                    <Text>Credit/Debit option is not available</Text>
                    </View>
                </View>
            </Cards>
        </View>
        </ScrollView>
        <View style={{flexDirection:'row',flex:0.06,justifyContent:"space-evenly",alignItems:"center",backgroundColor:"#D3D3D3"}}>
        <TouchableHighlight style={{width:"100%",height:"100%",backgroundColor:"#800080",alignItems:"center",justifyContent:"center"}}>
            <Text style={{color:"#FFFFFF",fontSize:20, fontWeight:"700"}}>Book</Text>
        </TouchableHighlight>
        </View>
        </View>
        );
    }
}
const styles=StyleSheet.create({
    card:{
        
    },
       
    

});