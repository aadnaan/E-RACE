import React, {Component} from 'react';
import {Text,TextInput,StyleSheet,View ,ImageBackground,Platform,ScrollView,Image,TouchableHighlight,FlatList} from 'react-native';
import Cards from '../Components/Cards';
import { Rating,SearchBar } from 'react-native-elements';
import { StrictMode } from 'react';
import SearchList from '../Components/SearchList';
import {f,auth,database,storage} from '../config/Config.js';
import { FontAwesome,Ionicons,MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

export default class SearchScreen extends Component{
    constructor(props) {
        super(props);
        this.carselectedHandler = this.carselectedHandler.bind(this);
        this.state = {
            search:'',
            refresh:false,
            car_list:[]
        };
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
            })
        }).catch(error=>console.log(error));
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
    updateSearch = search => {
        this.setState({ search });
        var queryvalue=this.state.search;
        console.log(queryvalue);
        this.setState({
            refresh:true,
            car_list:[]
        });
        that=this;
        database.ref('listings').orderByChild('Brand').startAt(queryvalue).endAt(queryvalue+'\uf8ff').once('value').then(function(snapshot){
            const exists=(snapshot.val()!==null);
            var car_feed=that.state.car_list;
            if(exists)
                data=snapshot.val();
                for(var list1 in data){
                    that.addToFlatList(car_feed,data,list1)
                }
            
            }).catch(error=>console.log(error));
        database.ref('listings').orderByChild('Model').startAt(queryvalue).endAt(queryvalue+'\uf8ff').once('value').then(function(snapshot){
            const exists=(snapshot.val()!==null);
            var car_feed=that.state.car_list;
            if(exists)
                data=snapshot.val();
                for(var list1 in data){
                    that.addToFlatList(car_feed,data,list1)
                }
            
            }).catch(error=>console.log(error));
    };
    loadNew=()=>{
        this.updateSearch();
    }

    componentDidMount(){
        
    }
    backButtonHandler=()=>{
        this.props.navigation.goBack();
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

    render()
    {
        const newArray = [];
        this.state.car_list.forEach(obj => {
          if (!newArray.some(o => o.ID === obj.ID)) {
            newArray.push({ ...obj })
          }
     
        });
        return(
            <Cards  style={{marginHorizontal:7, marginTop:27,marginBottom:10}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <TouchableHighlight onPress={()=>this.backButtonHandler()}>
                    <AntDesign name="left" color='black' size={20} style={{marginLeft:15}} />
                    </TouchableHighlight>
                    <SearchBar
                    containerStyle={{width:'90%',borderRadius:10,backgroundColor:'white'}}
                    placeholder="Type Here..."
                    onChangeText={this.updateSearch}
                    value={this.state.search}
                    />
                    
                </View>
                <FlatList
                    refreshing={this.state.refresh}
                    onRefresh={this.loadNew}
                    data={newArray}
                    contentContainerStyle={{paddingBottom:50}}
                    keyExtractor={(item,index)=>index.toString()}
                    renderItem={({item,index})=>(
                        <TouchableHighlight onPress={()=>this.carselectedHandler(item)}>
                        <SearchList Lister={item.Lister} imageUri={item.Thumbnail} Brand={item.Brand} Model={item.Model} Variant={item.Variant} Year={item.Year} Rating={item.Rating} NoOfTrips={item.NoOfTrips} key={index} />
                        </TouchableHighlight>

                )}/>
            </Cards>
            
        );
    }
}
const styles=StyleSheet.create({
    card:{
        
    },
       
    

});