import React, {Component} from 'react';
import {Text,TextInput,StyleSheet,View ,ImageBackground,Platform,ScrollView,Image,TouchableHighlight} from 'react-native';
import Cards from '../Components/Cards';
import { Rating } from 'react-native-elements';
import { StrictMode } from 'react';
import { MaterialCommunityIcons,FontAwesome5,FontAwesome,Ionicons,MaterialIcons, AntDesign,Entypo } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';

export default class RequestDetails extends Component{

    componentDidMount(){
       
    }

    render()
    {
        let Request_Details=this.props.navigation.state.params;
        let {DetailsPhotoURL}=Request_Details
        let {Thumbnail}=Request_Details
        
    return(
        <View style={{flex:1}}>               
            <ScrollView>
                <View style={{flex:1}}>
                    <Cards style={{margin:10,padding:10}}>
                        <View style={{flexDirection:'row'}}>
                            <View style={{width:'60%'}}>
                                <View style={{marginLeft:3,flexDirection:'row'}}>
                                    <View style={{}}>
                                        <TouchableHighlight style={styles.profileImgContainer}>
                                            <Image source={{ uri:Thumbnail }} style={styles.profileImg} />
                                        </TouchableHighlight>
                                    </View>
                                    <View style={{marginHorizontal:6}}>
                                        <Text style={{ fontSize: 13, fontWeight: '600' }}>{Request_Details.FullName}</Text>
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <Text style={{ fontSize: 12, fontWeight: '500' }}>4.7</Text>
                                            <Rating type={"custom"} startingValue={5} ratingColor={"#800080"} style={{marginHorizontal:2}} imageSize={12} ratingCount={1}/>
                                        </View>
                                        <Text style={{fontSize:12,color:'#800080'}}>Trips: <Text style={{fontSize:12,fontWeight:'500',color:'black'}}>{Request_Details.NoOfUserTrips}</Text></Text>
                                        <Text style={{fontSize:12,color:'#800080'}}>License no: <Text style={{fontSize:12,fontWeight:'500',color:'black'}}>{Request_Details.LicenseNo}</Text></Text>
                                    </View>
                                </View>
                                <View style={{marginTop:3}}>
                                    <Text style={{fontSize:13,fontWeight:'500',color:'#800080'}}>Vehicle: <Text style={{fontSize:14,fontWeight:'500',color:'black'}}>{Request_Details.Model} <Text style={{fontSize:13,fontWeight:'500'}}>{Request_Details.Variant} <Text style={{fontSize:12,fontWeight:'500'}}>{Request_Details.Year}</Text></Text></Text></Text>
                                    <Text style={{fontSize:13,fontWeight:'500',color:'#800080'}}>Registration: <Text style={{fontSize:14,fontWeight:'500',color:'black'}}>{Request_Details.Regno}</Text></Text>
                                </View>
                            </View>
                            <View style={{marginRight:5,alignSelf:'flex-start',width:'40%',overflow:'hidden'}}>
                                <Image style={{width: 160, height: 100,alignSelf:'center'}} resizeMode='contain' source={{uri: DetailsPhotoURL}}/>
                            </View>
                        </View>
                    </Cards>
                    <Cards style={{margin:10,padding:10}}>
                        <View style={{marginBottom:20}}>
                            <Text style={{fontSize:14,fontWeight:'500'}}>Trip Dates</Text>
                            <View style={{flexDirection:"row",justifyContent:"space-evenly",marginTop:8}}>
                                <View style={{alignItems:"center"}}>
                                    <Text style={{fontSize:16,fontWeight:'600',color:'grey'}}>{Request_Details.startMonth} <Text>{Request_Details.startDay}</Text></Text>
                                    <Text style={{fontSize:13,fontWeight:'500',color:'grey'}}>10:00<Text> AM</Text></Text>
                                </View>
                                <Entypo name="arrow-right" color={'#800080'} size={20} style={{marginLeft:5,marginTop:10}} />
                                <View style={{alignItems:"center"}}>
                                    <Text style={{fontSize:16,fontWeight:'600',color:'grey'}}>{Request_Details.endMonth} <Text>{Request_Details.endDay}</Text></Text>
                                    <Text style={{fontSize:13,fontWeight:'500',color:'grey'}}>10:00<Text> AM</Text></Text>
                                </View>
                            </View>
                            <View
                            style={{
                                marginVertical:18,
                                width:'95%',
                                alignSelf:'center',
                                borderBottomColor: 'grey',
                                borderBottomWidth: 1,
                            }}/>
                            <Text style={{fontSize:14,fontWeight:'500'}}>Price Details</Text>
                            <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:30,paddingTop:5,marginTop:10}}>
                                <Text style={{fontSize:14,fontWeight:'600',color:'#3c3c3c'}}>Trip Price</Text>
                                <Text style={{fontSize:14,fontWeight:'600',color:'#3c3c3c'}}>Rs.<Text>{Request_Details.CarPricePerDay}<Text>/day</Text></Text></Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:30,paddingTop:5}}>
                                <Text style={{fontSize:14,fontWeight:'600',color:'#3c3c3c'}}>Trip Fee</Text>
                                <Text style={{fontSize:14,fontWeight:'600',color:'#3c3c3c'}}>Rs.<Text>{parseInt(Request_Details.CarPricePerDay)*0.1}<Text>/day</Text></Text></Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:30,paddingTop:5}}>
                                <Text style={{fontSize:14,fontWeight:'600',color:'#3c3c3c'}}>500<Text> total miles</Text></Text>
                                <Text style={{fontSize:14,fontWeight:'600',color:'#3c3c3c'}}>Free</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:30,paddingTop:5}}>
                                <Text style={{fontSize:14,fontWeight:'600',color:'#3c3c3c'}}>{Request_Details.AdditionalMiles}<Text>-Additional Miles</Text></Text>
                                <Text style={{fontSize:14,fontWeight:'600',color:'#3c3c3c'}}>{Request_Details.AdditionalMiles}<Text> x Rs.<Text>{Request_Details.AdditionalMilePrice}</Text></Text></Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:30,paddingTop:5}}>
                            <Text style={{fontSize:15,fontWeight:'600'}}>Trip Total</Text>
                            <Text style={{fontSize:15,fontWeight:'600'}}>Rs.<Text style={{fontSize:15,fontWeight:'600'}}>{(parseInt(Request_Details.daysCalculated)*(parseInt(Request_Details.CarPricePerDay)+(parseInt(Request_Details.CarPricePerDay)*0.1)))+(parseInt(Request_Details.AdditionalMiles)*parseInt(Request_Details.AdditionalMilePrice))}</Text></Text>
                            </View>
                            <View
                            style={{
                                marginVertical:18,
                                width:'95%',
                                alignSelf:'center',
                                borderBottomColor: 'grey',
                                borderBottomWidth: 1,
                            }}/>
                            <Text style={{fontSize:14,fontWeight:'500'}}>Trip description</Text>
                            <View style={{alignSelf:'center',marginTop:6 ,width:350}}>
                                <Text style={{color:'#3c3c3c'}}>{Request_Details.DescriptionOfTrip}</Text>
                            </View>
                        </View>
                    </Cards>
                </View>
            </ScrollView>
            <View style={{backgroundColor:'#800080',flexDirection:'row'}}>
                <TouchableHighlight style={{width:'50%'}}>
                    <View style={{padding:10,borderRightWidth:2}}>
                        <Text style={{alignSelf:'center',fontSize:16,fontWeight: '700',color:'white'}}>Accept</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={{width:'50%'}}>
                    <View style={{padding:10,borderLeftWidth:2 }}>
                        <Text style={{alignSelf:'center',fontSize:16,fontWeight: '700',color:'white'}}>Reject</Text>
                    </View>
                </TouchableHighlight>            
            </View>
        </View>            
        );
    }
}
const styles=StyleSheet.create({
    profileImgContainer: {
        height: 50,
        width: 50,
        borderRadius: 25,
      },
      profileImg: {
        height: 50,
        width: 50,
        borderRadius: 25,
      },
    

});