import React, {Component} from 'react';
import {Text,TextInput,StyleSheet,View ,ImageBackground,Platform,ScrollView,Image,TouchableHighlight,Alert} from 'react-native';
import Cards from '../Components/Cards';
import { Rating } from 'react-native-elements';
import { StrictMode } from 'react';
import { MaterialCommunityIcons,FontAwesome5,FontAwesome,Ionicons,MaterialIcons, AntDesign,Entypo } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import { Button } from 'react-native-elements'
import {firestore } from "../config/Config.js";

export default class RequestDetail extends Component{
    constructor(props) {
        super(props);
        this.requestAcceptHandler=this.requestAcceptHandler.bind(this);
    }
    componentDidMount(){
    }
    chatHandler(){
        this.props.navigation.navigate({
            routeName:'Third',
            params:{
                ListerID:this.props.navigation.state.params.Lister,
                RenterID:this.props.navigation.state.params.Renter,
                CalledBy:"Lister",
            }
        })
    }
    startTripHandler(){
        Alert.alert(  
            'Confirmation',  
            'Are you sure',  
            [  
                {  
                    text: 'Cancel',  
                    onPress: () => {},  
                    style: 'cancel',  
                },  
                {text: 'OK', onPress: () =>
                {
                    var date=new Date()
                    var st=date.getHours().toString()+":"+date.getMinutes().toString()+":"+date.getSeconds().toString();
                    let docid=this.props.navigation.state.params.doc
                    firestore.collection("BookingRequests").doc(docid).update({
                        TripStart: "Single",
                        TripStartSingleTime:st
                    })
                    this.props.navigation.goBack();
                }
                },  
            ]  
        );
    }
    requestAcceptHandler(){
        
        Alert.alert(  
            'Confirmation',  
            'Are you sure',  
            [  
                {  
                    text: 'Cancel',  
                    onPress: () => {},  
                    style: 'cancel',  
                },  
                {text: 'OK', onPress: () =>
                {
                    // var date=new Date()
                    // var st=date.getHours().toString()+":"+date.getMinutes().toString()+":"+date.getSeconds().toString();
                    let docid=this.props.navigation.state.params.doc
                    let canceltimelefthour=this.props.navigation.state.params.cancelLeftHour
                    let canceltimeleftmin=this.props.navigation.state.params.cancelLeftMins
                    if(canceltimelefthour<24||(canceltimelefthour===24 && canceltimeleftmin<=0)){
                        firestore.collection("BookingRequests").doc(docid).update({
                            Status: "Confirmed"
                        })
                        this.props.navigation.goBack();
                    }else{
                    firestore.collection("BookingRequests").doc(docid).update({
                        Status: "Accepted"
                    })
                    this.props.navigation.goBack();
                }
                }
                },  
            ]  
        );
    }

    requestRejectHandler(){
        
        Alert.alert(  
            'Confirmation',  
            'Are you sure',  
            [  
                {  
                    text: 'Cancel',  
                    onPress: () => {},  
                    style: 'cancel',  
                },  
                {text: 'OK', onPress: () =>
                {
                    // var date=new Date()
                    // var st=date.getHours().toString()+":"+date.getMinutes().toString()+":"+date.getSeconds().toString();
                    let docid=this.props.navigation.state.params.doc
                    firestore.collection("BookingRequests").doc(docid).update({
                        Status: "Canceled"
                    })
                    this.props.navigation.goBack();
                }
                },  
            ]  
        );
    }
    cancelTripHandler(){
        Alert.alert(  
            'Confirmation',  
            'Are you sure',  
            [  
                {  
                    text: 'Cancel',  
                    onPress: () => {},  
                    style: 'cancel',  
                },  
                {text: 'OK', onPress: () =>
                {
                    // var date=new Date()
                    // var st=date.getHours().toString()+":"+date.getMinutes().toString()+":"+date.getSeconds().toString();
                    let docid=this.props.navigation.state.params.doc
                    firestore.collection("BookingRequests").doc(docid).update({
                        Status: "Canceled",
                    })
                    this.props.navigation.goBack();
                }
                },  
            ]  
        );
    }
    paymentReceivedHandler(){
        Alert.alert(  
            'Confirmation',  
            'Are you sure',  
            [  
                {  
                    text: 'Cancel',  
                    onPress: () => {},  
                    style: 'cancel',  
                },  
                {text: 'OK', onPress: () =>
                {
                    var date=new Date()
                    var st=date.getHours().toString()+":"+date.getMinutes().toString()+":"+date.getSeconds().toString();
                    let docid=this.props.navigation.state.params.doc
                    firestore.collection("BookingRequests").doc(docid).update({
                        AmountReceived: "Double",
                        AmountReceivedDoubleTime:st
                    })
                    this.props.navigation.goBack();
                }
                },  
            ]  
        );
    }
    confirmVehicleReturnHandler(){
        Alert.alert(  
            'Confirmation',  
            'Are you sure',  
            [  
                {  
                    text: 'Cancel',  
                    onPress: () => {},  
                    style: 'cancel',  
                },  
                {text: 'OK', onPress: () =>
                {
                    var date=new Date()
                    var st=date.getHours().toString()+":"+date.getMinutes().toString()+":"+date.getSeconds().toString();
                    let docid=this.props.navigation.state.params.doc
                    let userdetails=this.props.navigation.state.params
                    let triptotal1=(parseInt(userdetails.daysCalculated)*(parseInt(userdetails.CarPricePerDay)+(parseInt(userdetails.CarPricePerDay)*0.1)))+(parseInt(userdetails.AdditionalMiles)*parseInt(userdetails.AdditionalMilePrice))
                    firestore.collection("BookingRequests").doc(docid).update({
                        TripEnd: "Double",
                        TripEndDoubleTime:st,
                        Status:"Completed"
                    })
                    firestore.collection("CompletedTrips").add({
                        Lister: userdetails.Lister,
                        Renter: userdetails.Renter,
                        Model: userdetails.Model,
                        Brand: userdetails.Brand,
                        Variant: userdetails.Variant,
                        Year: userdetails.Year,
                        DaysCalculated: userdetails.daysCalculated,
                        StartDate:userdetails.StartDate,
                        EndDate:userdetails.EndDate,
                        CarPricePerDay: userdetails.CarPricePerDay,
                        AdditionalMiles: userdetails.AdditionalMiles,
                        RenterFirstName: userdetails.RenterFirstName,
                        ListerFirstName: userdetails.ListerFirstName,
                        RenterProfilePhoto: userdetails.RenterProfilePhoto,
                        ListerProfilePhoto: userdetails.ListerProfilePhoto,
                        ListingID:userdetails.ListingID,
                        Status:"Completed",
                        TimeStamp:1581946830,
                        TripTotal: triptotal1.toString(),
                        BookingRequestID:docid,

                    })
                    this.props.navigation.goBack();
                }
                },  
            ]  
        );
    }

    render()
    {
        let Request_Details=this.props.navigation.state.params;
        let {DetailsPhotoURL}=Request_Details
        let {Thumbnail}=Request_Details
        let {Status}=Request_Details
        let{cancelLeftHour}=Request_Details
        let{cancelLeftMins}=Request_Details
        let{leftEndHour}=Request_Details
        let{leftEndMins}=Request_Details
        let {AmountRec}=Request_Details
        let {TripS}=Request_Details
        let timeLeft1;
        let timeLeft2;
        let timeLeft3;
        
        if(((cancelLeftHour<24) || (cancelLeftHour===24 && cancelLeftMins <= 0)) && (AmountRec==="Single")){
            timeLeft1=(<View style={{marginHorizontal:10,paddingHorizontal:10,justifyContent:'space-evenly',alignItems:"center"}}>
                <Text style={{fontSize:14,fontWeight:'500'}}>If the payment for the trip has been received click below</Text>
                <Button onPress={()=>{
                    this.paymentReceivedHandler();
                }}
                buttonStyle={{ backgroundColor:"#800080",borderRadius:10 }}
                titleStyle={{ fontSize: 16, color: "#FFFFFF" }}
                title="Payment Received"
                />
                </View>);

        }else if(((cancelLeftHour<24) || (cancelLeftHour===24 && cancelLeftMins <= 0)) && (AmountRec==="Double")){
            timeLeft1=(<View style={{marginHorizontal:10,paddingHorizontal:10,justifyContent:'space-evenly',alignItems:"center"}}>
                <Text style={{fontSize:14,fontWeight:'500',textAlign:"center"}}>Receival of payment has been confirmed</Text>
            </View>);
        }else{
            timeLeft1=(<View style={{marginHorizontal:10,paddingHorizontal:10,justifyContent:'space-evenly',alignItems:"center"}}>
            <Text style={{fontSize:14,fontWeight:'500',textAlign:"center"}}>Option to confirm received payment for the trip will appear as soon as requester confirms paying it (around 0-24 Hours before start of trip)</Text>
        </View>);
        }

        if(((cancelLeftHour<1) || (cancelLeftHour===1 && cancelLeftMins <= 0)) && (AmountRec==="Double") && (TripS==="None")&&((leftEndHour>0) || (leftEndHour===0 && leftEndMins > 0))){
            timeLeft2=(<Text style={{fontSize:14,fontWeight: '600'}}>
            To start trip click here: 
        </Text>);
        }else if(((cancelLeftHour>24) || (cancelLeftHour===24 && cancelLeftMins > 0))&& (AmountRec==="None") && (TripS==="None")){
            timeLeft2=(<Text style={{fontSize:15,fontWeight: '600'}}>
                        Time left to Cancel Trip: <Text>{cancelLeftHour-24}</Text> Hours <Text>{cancelLeftMins}</Text> Minutes
                    </Text>);
        }else if(((cancelLeftHour<1) || (cancelLeftHour===1 && cancelLeftMins <= 0)) && (AmountRec==="Double") && (TripS==="Single")&&((leftEndHour>0) || (leftEndHour===0 && leftEndMins > 0))){
            timeLeft2=<Text style={{fontSize:14,fontWeight: '500',textAlign:"center",margin:5}}>
                        Waiting for requester to confirm start of trip
                    </Text>
        }else if(Status==="In Progress" && ((cancelLeftHour<1) || (cancelLeftHour===1 && cancelLeftMins <= 0)) && (AmountRec==="Double") && (TripS==="Double")&&((leftEndHour>0) || (leftEndHour===0 && leftEndMins > 0))){
            timeLeft2=(<Text style={{fontSize:14,fontWeight: '500',textAlign:"center",margin:5}}>
                        Trip has started
                    </Text>);
        }else if(((leftEndHour<0) || (leftEndHour===0 && leftEndMins <= 0)) && (AmountRec==="Double") && (TripS==="Double")&&(TripE==="None")){
            timeLeft2=(<Text style={{fontSize:14,fontWeight: '500',textAlign:"center",margin:5}}>
                        Option to confirm vehicle return will appear soon
                    </Text>);
        }else if(((leftEndHour<0) || (leftEndHour===0 && leftEndMins <= 0)) && (AmountRec==="Double") && (TripS==="Double")&&(TripE==="Single")){
            timeLeft2=(<Text style={{fontSize:14,fontWeight: '500',textAlign:"center",margin:5}}>
                        Click here to confirm Vehicle Return
                    </Text>);
        }else{
            timeLeft2=(<Text style={{fontSize:14,fontWeight: '500',textAlign:"center",margin:5}}>
                        Option to start trip will appear around 0-60 minutes before start of trip given the payment has been confirmed
                    </Text>);
        }

        if(((cancelLeftHour<1) || (cancelLeftHour===1 && cancelLeftMins <= 0)) && (AmountRec==="Double") && (TripS==="None")){
            timeLeft3=(<Button onPress={()=>{
                this.startTripHandler();
            }}
                buttonStyle={{ backgroundColor:"#800080",borderRadius:10 }}
                titleStyle={{ fontSize: 14, color: "#FFFFFF" }}
                title="Start Trip"
              />);
        }else if(((cancelLeftHour>24) || (cancelLeftHour===24 && cancelLeftMins > 0))&& (AmountRec==="None") && (TripS==="None")){
            timeLeft3=(<Button onPress={()=>{
                this.cancelTripHandler();
            }}
                buttonStyle={{ backgroundColor:"#800080",borderRadius:10 }}
                titleStyle={{ fontSize: 16, color: "#FFFFFF" }}
                title="Cancel"
              />);
        }else if(((leftEndHour<0) || (leftEndHour===0 && leftEndMins <= 0)) && (AmountRec==="Double") && (TripS==="Double")&&(TripE==="Single")){
            timeLeft3=(<Button onPress={()=>{
                this.confirmVehicleReturnHandler();
            }}
                buttonStyle={{ backgroundColor:"#800080",borderRadius:10 }}
                titleStyle={{ fontSize: 14, color: "#FFFFFF" }}
                title="Confirm Vehicle Return"
              />);
        }else{
            timeLeft3=null
        }


        
    return(
        <View style={{flex:1}}>               
            <ScrollView style={{flex:0.94}}>
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
                            <View>
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
                            </View>
                            <View
                            style={{
                                margin:18,
                                width:'95%',
                                alignSelf:'center',
                                borderBottomColor: 'grey',
                                borderBottomWidth: 1,
                            }}/>
                            {timeLeft1}
                            <View
                            style={{
                                margin:18,
                                width:'95%',
                                alignSelf:'center',
                                borderBottomColor: 'grey',
                                borderBottomWidth: 1,
                            }}/>
                            <View style={{marginHorizontal:10,paddingHorizontal:10,flexDirection:'row',justifyContent:'space-between'}}>
                                <Text style={{fontSize:14,fontWeight:'500'}}>Chat with <Text>{Request_Details.FullName}</Text></Text>
                                <TouchableHighlight onPress={()=>this.chatHandler()}>
                                    <AntDesign name="wechat" color={'#800080'} size={30} style={{}} />
                                </TouchableHighlight>
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
            {Status==="Pending"?(
            <View style={{backgroundColor:'#800080',flexDirection:'row',flex:0.06}}>
                <TouchableHighlight style={{width:'50%'}} onPress={()=>{
                    this.requestAcceptHandler();
                }}>
                    <View style={{padding:10,borderRightWidth:2}}>
                        <Text style={{alignSelf:'center',fontSize:16,fontWeight: '700',color:'white'}}>Accept</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={{width:'50%'}} onPress={()=>{
                    this.requestRejectHandler();
                }}>
                    <View style={{padding:10,borderLeftWidth:2 }}>
                        <Text style={{alignSelf:'center',fontSize:16,fontWeight: '700',color:'white'}}>Reject</Text>
                    </View>
                </TouchableHighlight>            
            </View>
            ):(<View style={{flexDirection:'row', padding:5,flex:0.06,justifyContent:"space-evenly",alignItems:"center",backgroundColor:"#D3D3D3"}}>
                {timeLeft2}
                {timeLeft3}
                
                
                  


            </View>)}
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