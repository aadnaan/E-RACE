import React, {Component} from 'react';
import {TextInput,StyleSheet,View,Button,Text,ScrollView,Image,TouchableHighlight, Alert,} from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import Cards from '../Components/Cards';
import { Rating } from 'react-native-elements';
import { FontAwesome5,FontAwesome,Ionicons,MaterialIcons, AntDesign,Entypo } from '@expo/vector-icons';
import { theme, withGalio, GalioProvider,Icon} from 'galio-framework';
import DatePicker from 'react-native-date-ranges';
import { Button as Button1 } from 'react-native-elements'
import {Button as Button2} from 'native-base';
import {Text as Text1} from 'native-base';
import {StyleProvider} from 'native-base';
import getTheme from '../native-base-theme/components';
import custom from '../native-base-theme/variables/custom';
import platform from '../native-base-theme/variables/platform';



export default class SelectedCar extends Component{
    constructor(props) {
        super(props);
        this.setDates = this.setDates.bind(this);
        this.checkoutHandler = this.checkoutHandler.bind(this);
        this.showAlert1 = this.showAlert1.bind(this);
        this.state = {
            startDate:null,
            endDate:null,
            daysCalculated:null,
            checked:false
        };
        }
        showAlert1() {
            if(this.state.checked==true){  
                Alert.alert(  
                    'Confirmation',  
                    'Are you sure',  
                    [  
                        {  
                            text: 'Cancel',  
                            onPress: () => console.log('Cancel Pressed'),  
                            style: 'cancel',  
                        },  
                        {text: 'OK', onPress: () => this.checkoutHandler()},  
                    ]  
                );
            }else{ 
                Alert.alert(  
                'Trip dates not selected',  
                'Please select trip dates first',    
                [{text: 'OK', onPress: () => console.log('Ok Pressed')},]   
            );
            }  
        }  
        
        customButton = (onConfirm) => (
            
            <Button1
                onPress={onConfirm}
                type='clear'
                style={{}}
                title={'CONFIRM'}
                titleStyle={{color:'#800080',fontSize:20,fontWeight:'800'}}
            />
            
           
        )
        async setDates (dates) {
            var msDiff = new Date(dates.endDate).getTime() - new Date(dates.startDate).getTime();    //Future date - current date
            var daysCalculated = Math.floor(msDiff / (1000 * 60 * 60 * 24));
            const currentTimeStamp = new Date().getTime();
            console.log(currentTimeStamp);
            await this.setState({
              startDate:dates.startDate,
              endDate:dates.endDate,
              checked:true,
              daysCalculated:daysCalculated,
            });
          };
        checkoutHandler=()=>{
            let car_details=this.props.navigation.state.params;
            tripFee=car_details.RatePerDay*0.1
            var startDay=new Date(this.state.startDate).getDate()
            var startMonth=new Date(this.state.startDate).getMonth()
            var endDay=new Date(this.state.endDate).getDate()
            var endMonth=new Date(this.state.endDate).getMonth()
            var Months = ["Jan", "Feb", "Mar","Apr", "May", "Jun","Jul", "Aug", "Sept","Oct", "Nov", "Dec"];
            var startMonth1=Months[startMonth]
            var endMonth1=Months[endMonth]
            this.props.navigation.navigate({
                routeName:'Fourth',
                params:{
                    Lister:car_details.Lister,
                    ID:car_details.ID,
                    URL:car_details.URL,
                    Model:car_details.Model,
                    Brand:car_details.Brand,
                    Variant:car_details.Variant,
                    Year:car_details.Year,
                    Regno:car_details.Regno,
                    Rating:car_details.Rating,
                    NoOfTrips:car_details.NoOfTrips,
                    MilesAllowed:car_details.MilesAllowed,
                    RatePerDay:car_details.RatePerDay,
                    Pickup:car_details.Pickup,
                    AdditionalMilePrice:car_details.AdditionalMilePrice,
                    TripFee:tripFee,
                    daysCalculated:this.state.daysCalculated,
                    startDate:this.state.startDate,
                    endDate:this.state.endDate,
                    startDay:startDay,
                    startMonth:startMonth1,
                    endDay:endDay,
                    endMonth:endMonth1,
                }
            })
        }
    render()
    {
        let car_details=this.props.navigation.state.params;
        return(
        <View style={{flex:1}}>
        <ScrollView>
        <View>
            <Cards style={{margin:10}}>
                <View style={{marginLeft:5.5,marginTop:5,borderRadius:10,overflow:"hidden",width:380}}>
                <SliderBox
                parentWidth={382}
                images={car_details.URL}
                sliderBoxHeight={180}
                onCurrentImagePressed={index =>
                console.warn(`image ${index} pressed`)
                }
                dotColor="#800080"
                inactiveDotColor="#90A4AE"
                paginationBoxVerticalPadding={10}
                
                circleLoop
                />
                </View>
                <View style={{flexDirection:"row"}}>
                <View style={{width:280}}>
                    <View style={{marginLeft:10,marginTop:5}}>
                        <Text style={{ fontSize: 12, fontWeight: '300' }}>
                            {car_details.Lister}<Text>'s</Text>
                        </Text>
                    </View>
                    <View style={{height:23, width:230,flexDirection : "row",marginLeft:5}}>
                            <Text style={{ fontSize: 18, fontWeight: '500', paddingHorizontal: 5 }}>
                            {car_details.Model}
                            </Text>
                            <Text style={{ fontSize: 14, fontWeight: '700', paddingHorizontal: 5 , paddingTop:5}}>
                            {car_details.Year}
                            </Text>
                    </View>
                    <View style={{marginLeft:11}}>
                    <Text style={{ fontSize: 14, fontWeight: '500' }}>
                        {car_details.Variant} 
                    </Text>  
                    </View>
                    <View style={{height:35, width:230,alignItems:'flex-start',marginLeft:11,flexDirection : "row"}}>
                        <Text style={{ fontSize: 12, fontWeight: '300' }}>
                          {car_details.NoOfTrips} <Text style={{ fontSize: 12, fontWeight: '300' }}>Trips</Text>
                        </Text>
                        <View style={{marginLeft:15,marginTop:1}}>
                            <Rating type={"custom"} startingValue={car_details.Rating} ratingColor={"#800080"}  imageSize={15} ratingCount={5}/>
                        </View>

                </View>
                </View>
                <View style={{marginTop :30 }}>
                    <Text style={{ fontFamily:"Seagram" ,fontSize: 20}}>
                        {car_details.RatePerDay}<Text>Rs</Text>
                    </Text>
                    <View style={{}}>
                    <Text style={{ fontSize: 14, fontWeight: '500'}}>
                        per day
                    </Text>
                    </View>
                </View>
                </View>
            </Cards>
            <Cards style={{margin:10}}>
                <View style={{marginLeft:10,marginBottom:4}}>
                    <View style={{marginTop:5 ,marginLeft:4}}>
                    <Text style={{ fontSize: 14, fontWeight: '500' }}>
                        Trip Dates
                    </Text>
                    </View>
                    <View style={{flexDirection:"row",}}>
                    <AntDesign name="calendar" color={'#800080'} size={30} style={{marginLeft:5,marginTop:10}} />
                    <DatePicker
                    style={{ marginTop:10,width: 280, height: 30,marginLeft:8,borderColor:"#800080" }}
                    customStyles = { {
                    placeholderText:{ fontSize:14,color:theme.COLORS.GREY }, // placeHolder style
                    headerStyle : {  },			// title container style
                    headerMarkTitle : { }, // title mark style 
                    headerDateTitle: { }, // title Date style
                    contentInput: {}, //content text container style
                    contentText: {fontSize:12}, //after selected text Style
                    } } // optional 
                    centerAlign // optional text will align center or not
                    allowFontScaling = {false} // optional
                    placeholder={'Select Trip Dates'}
                    mode={'range'}
                    onConfirm = {this.setDates}
                    selectedBgColor="#800080"
                    selectedTextColor={theme.COLORS.BLACK}
                    customButton = {this.customButton}
                    markText='Pick Your Trip Dates'
                    
                    />
                    
                    </View>
                    <View
                    style={{
                        marginLeft:6,
                        marginTop:18,
                        width:360,
                        borderBottomColor: theme.COLORS.GREY,
                        borderBottomWidth: 1,
                    }}/>
                    <View style={{marginTop:12 ,marginLeft:4}}>
                    <Text style={{ fontSize: 14, fontWeight: '500' }}>
                        Pickup & Return
                    </Text>
                    </View>
                    <View style={{flexDirection:"row",}}>
                    <Entypo name="location" color={'#800080'} size={30} style={{marginLeft:5,marginTop:10}} />
                    <View style={{marginLeft:15,marginTop:11}}>
                    <Text style={{ fontSize: 16,fontWeight: '300' }}>
                        {car_details.Pickup}
                    </Text>
                    </View>
                    <View style={{marginLeft:40}}>
                    <StyleProvider style={getTheme(platform)}>
                    <Button2 success transparent>
                    <Text1>Show</Text1>
                    </Button2>
                    </StyleProvider>
                    </View>
                    </View>
                    <View
                    style={{
                        marginLeft:6,
                        marginTop:18,
                        width:360,
                        borderBottomColor: theme.COLORS.GREY,
                        borderBottomWidth: 1,
                    }}/>
                    <View style={{marginTop:12 ,marginLeft:4}}>
                    <Text style={{ fontSize: 14, fontWeight: '500' }}>
                        Distance Included
                    </Text>
                    </View>
                    <View style={{flexDirection:"row"}}>
                    <FontAwesome5 name="road" color={'#800080'} size={30} style={{marginLeft:5,marginTop:10}} />
                    <View style={{marginLeft:15,marginTop:11}}>
                    <Text style={{ fontSize: 14,fontWeight: '500' }}>
                        {car_details.MilesAllowed} <Text>Miles Per Day</Text>
                    </Text>
                    <Text style={{ color:theme.COLORS.GREY,fontSize: 12,fontWeight: '500' }}>
                        {car_details.AdditionalMilePrice} <Text>charge for each additional mile</Text>
                    </Text>
                    </View>
                    </View>
                    <View
                    style={{
                        marginLeft:6,
                        marginTop:18,
                        width:360,
                        borderBottomColor: theme.COLORS.GREY,
                        borderBottomWidth: 1,
                    }}/>
                </View>
                <View style={{marginTop:13,flexDirection:'row',justifyContent:'center'}}>
                    <View>
                    <Image resizeMode={"contain"} source={require("../assets/seat.png")} style={{width: 50, height: 60}} />
                    <View style={{alignSelf:'center',marginTop:4}}>
                    <Text style={{ fontSize: 12,fontWeight: '500' }}>
                        {car_details.Seats} <Text>Seats</Text>
                    </Text>
                    </View>
                    </View>
                    <View style={{marginLeft:35}}>
                    <Image resizeMode={"contain"} source={require("../assets/car-door.png")} style={{alignSelf:'center',width: 50, height: 60}} />
                    <View style={{alignSelf:'center',marginTop:4}}>
                    <Text style={{ fontSize: 12,fontWeight: '500' }}>
                        {car_details.Doors} <Text>Doors</Text>
                    </Text>
                    </View>
                    </View>
                    <View style={{marginLeft:35}}>
                    <Image resizeMode={"contain"} source={require("../assets/gasoline.png")} style={{alignSelf:'center' ,width: 55, height: 65}} />
                    <View style={{alignSelf:'center'}}>
                    <Text style={{ fontSize: 12,fontWeight: '500' }}>
                        {car_details.PetrolMilesPerLitre} <Text>KG</Text>
                    </Text>
                    </View>
                    </View>
                    <View style={{marginLeft:35}}>
                    <Image resizeMode={"contain"} source={require("../assets/gas.png")} style={{alignSelf:'center',width: 55, height: 65}} />
                    <View style={{alignSelf:'center'}}>
                    <Text style={{ fontSize: 12,fontWeight: '500' }}>
                        {car_details.CNGMilesPerKG} <Text>Litre</Text>
                    </Text>
                    </View>
                    </View>
                </View>
                <View style={{marginLeft:10,marginBottom:4}}>
                <View
                    style={{
                        marginLeft:6,
                        marginTop:18,
                        width:360,
                        borderBottomColor: theme.COLORS.GREY,
                        borderBottomWidth: 1,
                }}/>
                <View style={{marginTop:12 ,marginLeft:4}}>
                    <Text style={{ fontSize: 14, fontWeight: '500' }}>
                        Description
                    </Text>
                </View>
                <View style={{marginLeft:5,marginTop:6 ,width:350}}>
                    <Text>
                        {car_details.Description}
                    </Text>
                </View>
                <View
                    style={{
                        marginLeft:6,
                        marginTop:18,
                        width:360,
                        borderBottomColor: theme.COLORS.GREY,
                        borderBottomWidth: 1,
                }}/>
                
                <View style={{marginTop:12 ,marginLeft:4}}>
                    <Text style={{ fontSize: 14, fontWeight: '500' }}>
                        Hosted By
                    </Text>
                </View>
                <View style={{flexDirection:'row'}}>
                <View style={{marginLeft:7,marginTop:11}}>
                <TouchableHighlight style={styles.profileImgContainer}>
                    <Image source={{ uri:"https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png" }} style={styles.profileImg} />
                </TouchableHighlight>
                </View>
                <View style={{marginLeft:8,marginTop:14}}>
                    <Text style={{ fontSize: 16, fontWeight: '600' }}>
                    {car_details.Lister}
                    </Text>
                    <View style={{flexDirection:'row',alignItems:'center',marginLeft:3}}>
                        <Text>4.7</Text>
                        <Rating type={"custom"} startingValue={5} ratingColor={"#800080"}  imageSize={12} ratingCount={5}/>
                    </View>
                    <View>
                        <Text style={{ fontSize: 12 }}>50 Trips Completed</Text>
                    </View>
                </View>
                </View>
                </View>
            </Cards>
         </View>
        </ScrollView>
        <View style={{backgroundColor:'#800080'}}>
            <TouchableHighlight onPress={onPress=()=>this.showAlert1()}>
            <View style={{padding:10}}>
            <Text style={{alignSelf:'center',fontSize:16,fontWeight: '700',color:'white'}}>Go to checkout</Text>
            </View>
            </TouchableHighlight>
            
        </View>
        </View>
            
        );
    }
}
const styles=StyleSheet.create({
    profileImgContainer: {
        height: 60,
        width: 60,
        borderRadius: 30,
      },
      profileImg: {
        height: 60,
        width: 60,
        borderRadius: 30,
      },
});