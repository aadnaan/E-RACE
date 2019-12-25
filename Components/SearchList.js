import React, {Component} from 'react';
import {Text,TextInput,StyleSheet,View ,ImageBackground,Platform,ScrollView,Image} from 'react-native';
import Cards from '../Components/Cards';
import { Rating,SearchBar } from 'react-native-elements';
import { StrictMode } from 'react';

export default class SearchList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            search:''
        };
    }
    updateSearch = search => {
        this.setState({ search });
      };

    componentDidMount(){
        
    }

    render()
    {
        const {imageUri} = this.props;
        return(
                
                <Cards style={{flexDirection : "row",marginVertical:8,marginHorizontal:8,}}>
                    <View style={{margin:8,borderWidth:2,borderColor:'#800080',borderRadius:8}}>
                        <ImageBackground resizeMode={"contain"} style={{width:130,height:80}} source={{uri:imageUri}}/>
                    </View>
                    <View style={{marginVertical:4,marginHorizontal:4}}>
                        <Text style={{ fontSize: 12, fontWeight: '300' }}>{this.props.Lister}<Text>'s</Text></Text>
                        <Text style={{ fontSize: 16, fontWeight: '500'}}>{this.props.Brand} <Text>{this.props.Model}</Text> <Text style={{ fontSize: 12, fontWeight: '600' }}>{this.props.Year}</Text></Text>
                        <Text style={{ fontSize: 12, fontWeight: '400' }}>{this.props.Variant}</Text>
                        <View style={{ alignItems:'flex-start',marginTop:2}}>
                        <Rating type={"custom"} startingValue={this.props.Rating} ratingColor={"#800080"}  imageSize={12} ratingCount={5}/>
                        </View>
                        <Text style={{ fontSize: 12, fontWeight: '300' }}>{this.props.NoOfTrips} <Text style={{ fontSize: 12, fontWeight: '300' }}>Trips</Text></Text>
                    </View>
                </Cards>
            
        );
    }
}
const styles=StyleSheet.create({
    card:{
        
    },
       
    

});