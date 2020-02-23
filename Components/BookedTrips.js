import React, {Component} from 'react';
import {Text,TextInput,StyleSheet,View ,ImageBackground,Platform,ScrollView,Image} from 'react-native';
import Cards from '../Components/Cards';
import { Rating,SearchBar } from 'react-native-elements';
import { StrictMode } from 'react';
import {Entypo } from '@expo/vector-icons';

export default class BookedTrips extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    componentDidMount(){
        
    }

    render()
    {
        const {imageUri} = this.props;
        return(
                
                <Cards style={{overflow:'hidden',marginVertical:4}}>
                    <View style={{width:'100%',backgroundColor:'#0df40d'}}>
                       <Text style={{alignSelf:'center',fontWeight:'600'}}>Completed</Text> 
                    </View>
                    <View style={{flexDirection : "row",justifyContent:'space-between',marginRight:3}} >
                    <View style={{flexDirection : "row"}}>
                    <View style={styles.profileImgContainer}>
                    <Image source={{ uri:"https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png" }} style={styles.profileImg} />
                    </View>
                    <View style={{marginVertical:4}}>
                        <Text style={{ fontSize: 13, fontWeight: '400', color:'#800080'}}>Vehicle Owner: <Text style={{ fontSize: 13, fontWeight: '500',color:'black' }}>Ali</Text></Text>
                        <Text style={{ fontSize: 13,color:'#800080'}}>Vehicle: <Text style={{ fontSize: 14, fontWeight: '500',color:'black'}}>Land-Cruiser <Text style={{ fontSize: 13, fontWeight: '500' }}>V8 </Text><Text style={{ fontSize: 12, fontWeight: '500' }}>2011</Text></Text></Text>
                        <Text style={{ fontSize: 13,color:'#800080'}}>For <Text style={{ fontSize: 14, fontWeight: '500',color:'black'}}>2 <Text style={{ fontSize: 13, fontWeight: '500' }}>Days</Text></Text></Text>
                        <Text style={{ fontSize: 13,color:'#800080'}}>Trip total: <Text style={{ fontSize: 14, fontWeight: '500',color:'black'}}>Rs. <Text style={{ fontSize: 13, fontWeight: '500' }}>8000</Text></Text></Text>
                    </View>
                    </View>
                    <View style={{alignItems:'center',alignSelf:'center',marginHorizontal:5}}>
                        <Text style={{color:'grey',fontSize:13,fontWeight:'500'}}>Feb 11</Text>
                        <Entypo name="arrow-down" color={'#800080'} size={15} style={{}} />
                        <Text style={{color:'grey',fontSize:13,fontWeight:'500'}}>Feb 17</Text>
                    </View>
                    </View>
                    <View style={{marginBottom:5,marginHorizontal:10}}>
                        <Text style={{fontSize:11,color:'grey',fontWeight:'500'}}>2 minutes ago</Text>
                    </View>
                </Cards>
            
        );
    }
}
const styles=StyleSheet.create({
    profileImgContainer: {
        height: 70,
        width: 100,
        borderRadius: 5,
        margin:8,
      },
      profileImg: {
        height: 70,
        width: 100,
        borderRadius: 5,
      },
});