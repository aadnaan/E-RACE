import React, {Component} from 'react';
import {Text,TextInput,StyleSheet,View ,ImageBackground,Platform,ScrollView,FlatList,TouchableHighlight} from 'react-native';
import Cards from '../Components/Cards';
import { Input, Block } from 'galio-framework';
import { theme, withGalio, GalioProvider,Icon} from 'galio-framework';
import { FontAwesome,Ionicons,MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import VehicleList from "../Components/VehicleList";
import {f,auth,database,storage} from '../config/Config.js'
 
export default class Home extends Component{
    constructor(props){
        super(props);
        this.carselectedHandler = this.carselectedHandler.bind(this);
        this.state={
            car_list:[],
            refresh:false,
            loading:true,
        }
    }
    
    componentDidMount=()=>{
        this.loadcarlist();
        this.setState({
            loading:false
        })

    }
    
    
    addToFlatList2(car_feed,carobj,eta,list1){
        var that = this;
        database.ref('users').child(carobj.listerID).once('value').then(function(snapshot2){
            const exists=(snapshot2.val()!==null);
            if(exists) peta=snapshot2.val();
            car_feed.push({
                Lister:peta.Name,
                ID:list1,
                URL:[carobj.PhotoURL1,carobj.PhotoURL2],
                Thumbnail:carobj.PhotoURL1,
                Model:eta.Model,
                Brand:eta.Brand,
                Variant:eta.Variant,
                Year:eta.Year,
                Doors:eta.Doors,
                Seats:eta.Seats,
                Transmission:eta.Transmission,
                Regno:eta.Regno,
                Rating:eta.Rating,
                NoOfTrips:eta.NoOfTrips,
                MilesAllowed:carobj.MilesAllowed,
                RatePerDay:carobj.RatePerDay,
                Pickup:carobj.Pickup,
                AdditionalMilePrice:carobj.AdditionalMilePrice,
                PetrolMilesPerLitre:carobj.PetrolMilesPerLitre,
                CNGMilesPerKG:carobj.CNGMilesPerKG,
                Description:carobj.Description

            });
            that.setState({
                refresh:false,
                loading:false,
            })
        }).catch(error=>console.log(error));
    }
    searchHandler=()=>{
        this.props.navigation.navigate({
            routeName:'Third',
        })
    }
    carselectedHandler=(item)=>{
        this.props.navigation.navigate({
            routeName:'Second',
            params:{
                Lister:item.Lister,
                ID:item.ID,
                URL:item.URL,
                Model:item.Model,
                Brand:item.Brand,
                Variant:item.Variant,
                Year:item.Year,
                Doors:item.Doors,
                Seats:item.Seats,
                Transmission:item.Transmission,
                Regno:item.Regno,
                Rating:item.Rating,
                NoOfTrips:item.NoOfTrips,
                MilesAllowed:item.MilesAllowed,
                RatePerDay:item.RatePerDay,
                Pickup:item.Pickup,
                AdditionalMilePrice:item.AdditionalMilePrice,
                CNGMilesPerKG:item.CNGMilesPerKG,
                PetrolMilesPerLitre:item.PetrolMilesPerLitre,
                Description:item.Description
            }
        })
    }
    addToFlatList=(car_feed,data,list1)=>{
        var that=this;
        var carobj=data[list1];
        database.ref('cars').child(carobj.carlisted).once('value').then(function(snapshot1){
            const exists=(snapshot1.val()!==null);
            if(exists) eta=snapshot1.val()
            that.addToFlatList2(car_feed,carobj,eta,list1)
        
        }).catch(error=>console.log(error));
    }
    loadcarlist=()=>{
        this.setState({
            refresh:true,
            car_list:[]
        });
        var that=this;
        database.ref('listings').once('value').then(function(snapshot){
            const exists=(snapshot.val()!==null);
            if(exists) data=snapshot.val();
                var car_feed=that.state.car_list;
                for(var list1 in data){
                    that.addToFlatList(car_feed,data,list1);
                }
        }).catch(error=>console.log(error));
    }
    loadNew=()=>{
        this.loadcarlist();
    }
    
    render()
    {   
        return(
            <View style={{flexDirection:"column"}}>
            <View style={{padding:5,height:'50%'}} >
                <ImageBackground source={require("../assets/home.jpeg")} blurRadius={1.5} style={{height:'100%', width:'100%',alignItems:"center"}} imageStyle={{ borderRadius: 10 }}>
                <Text style={styles.Heading}>Find Your Car</Text>
                <Cards style={styles.CardContainer}>
                    <TouchableHighlight style={{height:35,width:340 ,marginLeft:10, borderColor:'#800080',borderWidth:2,borderRadius:20,justifyContent:'center'}} onPress={()=>this.searchHandler()}>
                        <View style={{flexDirection:'row',marginLeft:8,}}>
                        <AntDesign name="search1" color={theme.COLORS.GREY} size={20} style={{marginLeft:15}} />
                        <View style={{marginLeft:4}}>
                        <Text>
                            Search by Brand,Model
                        </Text>
                        </View>
                        </View>
                    </TouchableHighlight>
                </Cards>
               
                </ImageBackground> 
            </View>
            <View style={{padding:5}}>
                <Text style={{ fontSize: 14, fontWeight: '400', paddingHorizontal: 10}}>
                    Vehicles you may like
                </Text>
                <View style={{ height: 270}}>
                    {this.state.loading==true?(
                        <View>
                            <Text>loading...</Text>
                        </View>
                    ):(
                    <FlatList
                    horizontal={true}
                    refreshing={this.state.refresh}
                    onRefresh={this.loadNew}
                    data={this.state.car_list}
                    keyExtractor={(item,index)=>index.toString()}
                    renderItem={({item,index})=>(
                        <TouchableHighlight onPress={()=>this.carselectedHandler(item)}>
                        <VehicleList key={index} imageuri={item.Thumbnail} rating={item.Rating} name={item.Brand} Model={item.Model} year={item.Year}/>
                        </TouchableHighlight>

                    )}/>
                    )}
                       
                    

                </View>
            </View>
            </View>
            
        );
    }
}
const styles=StyleSheet.create({
    CardContainer:{
        flexDirection:"row",
        width:'90%',
        alignItems:"center",
        height:50
    },
    inputContainer:{
        height: Platform.OS == 'android' ? 30 : 20,
        width:280,
        marginLeft:8,
        fontSize:2,
        borderColor:theme.COLORS.GREY,
        elevation:4,
    },
    Heading:{
        paddingTop:15,
        paddingBottom:8,
        fontSize:24,
        fontWeight:'900',
        color:theme.COLORS.WHITE,
        textShadowColor:theme.COLORS.WHITE,
        textShadowRadius:5,

    },
    Heading2:{
        paddingTop:15,
        fontFamily:"Patchwork",
        fontSize:12,
        color:'#990000',
        textAlign: 'center',
        marginTop:50,
        textShadowColor:theme.COLORS.WHITE,
        textShadowRadius:5,
        textShadowOffset:{height:2,width:2},
        

    }
   
       
    

});