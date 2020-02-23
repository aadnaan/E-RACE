import React, {Component} from 'react';
import {Text,TextInput,StyleSheet,View ,ImageBackground,Platform,ScrollView,Image} from 'react-native';
import Cards from '../Components/Cards';
import { Rating,SearchBar } from 'react-native-elements';
import { StrictMode } from 'react';
import {Entypo } from '@expo/vector-icons';

export default class RequestList extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    componentDidMount(){
        
    }
    

    render()
    {

        return(
                
                <Cards style={{overflow:'hidden',marginVertical:4}}>
                    <View style={{width:'100%',backgroundColor:'#0df40d'}}>
                       <Text style={{alignSelf:'center',fontWeight:'600'}}>{this.props.Status}</Text> 
                    </View>
                    <View style={{flexDirection : "row",justifyContent:'space-between',marginRight:10}} >
                    <View style={{flexDirection : "row"}}>
                    <View style={styles.profileImgContainer}>
                    <Image source={{ uri:"https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png" }} style={styles.profileImg} />
                    </View>
                    <View style={{marginVertical:4,marginHorizontal:4}}>
                        <Text style={{ fontSize: 12, fontWeight: '500' }}>{this.props.Renter}<Text style={{ fontSize: 12, fontWeight: '400',color:'#800080' }}>'s request for</Text></Text>
                        <Text style={{ fontSize: 13,color:'#800080'}}>Your <Text style={{ fontSize: 14, fontWeight: '500',color:'black'}}>{this.props.Brand} <Text>{this.props.Model} </Text><Text style={{ fontSize: 13, fontWeight: '500' }}>{this.props.Variant} </Text><Text style={{ fontSize: 12, fontWeight: '500' }}>{this.props.Year}</Text></Text></Text>
                        <Text style={{ fontSize: 13,color:'#800080'}}>For <Text style={{ fontSize: 14, fontWeight: '500',color:'black'}}>{this.props.daysCalculated} <Text style={{ fontSize: 13, fontWeight: '500' }}>Days</Text></Text></Text>
                    </View>
                    </View>
                    <View style={{alignItems:'center',alignSelf:'center'}}>
                        <Text style={{color:'grey',fontSize:13,fontWeight:'500'}}>{this.props.startMonth} {this.props.startDay}</Text>
                        <Entypo name="arrow-down" color={'#800080'} size={15} style={{}} />
                        <Text style={{color:'grey',fontSize:13,fontWeight:'500'}}>{this.props.endMonth} {this.props.endDay}</Text>
                    </View>
                    </View>
                    <View style={{marginBottom:5,marginHorizontal:10}}>
                        <Text style={{fontSize:11,color:'grey',fontWeight:'500'}}>{this.props.TimeStamp}</Text>
                    </View>
                </Cards>
            
        );
    }
}
const styles=StyleSheet.create({
    profileImgContainer: {
        height: 50,
        width: 50,
        borderRadius: 25,
        margin:8,
      },
      profileImg: {
        height: 50,
        width: 50,
        borderRadius: 25,
      },
});