import React, {Component} from 'react';
import {Text,TextInput,StyleSheet,View ,ImageBackground,Platform,ScrollView,Image,FlatList,TouchableHighlight} from 'react-native';
import Cards from '../Components/Cards';
import { Rating } from 'react-native-elements';
import { StrictMode } from 'react';
import RequestList from '../Components/RequestList';
import {f,auth,database,storage,firestore} from '../config/Config.js'

export default class Requests extends Component{

    constructor(props){
        super(props);
        this.state={
            requestList:[],
            refresh:false,
            loading:true,
        }


    }
    componentDidMount(){
        this.loadNew();
        this.setState({
            loading:false
        })

    }
    timeDifference(current, previous) {

        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;
    
        var elapsed = current - previous;
    
        if (elapsed < msPerMinute) {
             return Math.round(elapsed/1000) + ' seconds ago';   
        }
    
        else if (elapsed < msPerHour) {
             return Math.round(elapsed/msPerMinute) + ' minutes ago';   
        }
    
        else if (elapsed < msPerDay ) {
             return Math.round(elapsed/msPerHour ) + ' hours ago';   
        }
    
        else if (elapsed < msPerMonth) {
            return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
        }
    
        else if (elapsed < msPerYear) {
            return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
        }
    
        else {
            return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
        }
    }
    addToFlatList1(bookingRequest_feed,data){
        var that=this;
        firestore.collection('Users').doc(data.RenterID).get().then(doc=>{
            const exists=(doc.data()!==null)
            if(exists){
            userdetail=doc.data()
            var startDay=new Date(data.StartDate).getDate()
            var startMonth=new Date(data.StartDate).getMonth()
            var endDay=new Date(data.EndDate).getDate()
            var endMonth=new Date(data.EndDate).getMonth()
            var Months = ["Jan", "Feb", "Mar","Apr", "May", "Jun","Jul", "Aug", "Sept","Oct", "Nov", "Dec"];
            var startMonth1=Months[startMonth]
            var endMonth1=Months[endMonth]
            var timestamp=this.timeDifference(new Date().getTime(),data.TimeStamp)
            bookingRequest_feed.push({
                Renter:userdetail.Name,
                ID:data.UserID,
                Thumbnail:data.RenterProfilePhoto,
                Model:data.Model,
                Brand:data.Brand,
                Variant:data.Variant,
                Year:data.Year,
                daysCalculated:data.daysCalculated,
                startMonth:startMonth1,
                endMonth:endMonth1,
                startDay:startDay,
                endDay:endDay,
                Status:data.Status,
                TimeStamp:timestamp
            });
            that.setState({
                refresh:false,
                loading:false,
            })          
        }
    })

    }
    loadBookingList=()=>{
        this.loadNew();
    }
    loadNew=()=>{
        this.setState({
            refresh:true,
            requestList:[]
        });
        var that=this;
        firestore.collection('BookingRequests').get().then((snapshot)=>{
            snapshot.docs.forEach(doc => {
                const exists=(doc.data()!==null)
                if(exists){
                data=doc.data();
                var bookingRequest_feed=that.state.requestList;
                that.addToFlatList1(bookingRequest_feed,data)
                }
            })
        })
    }

    render()
    {
        
        return(
            <View style={{flex:1,margin:7}}>
                <FlatList
                    refreshing={this.state.refresh}
                    onRefresh={this.loadBookingList}
                    data={this.state.requestList}
                    contentContainerStyle={{paddingBottom:50}}
                    keyExtractor={(item,index)=>index.toString()}
                    renderItem={({item,index})=>(
                        <TouchableHighlight>
                            <RequestList Renter={item.Renter} 
                            Brand={item.Brand} 
                            Model={item.Model} 
                            Variant={item.Variant} 
                            Year={item.Year} 
                            startMonth={item.startMonth}
                            endMonth={item.endMonth}
                            startDay={item.startDay}
                            endDay={item.endDay}
                            daysCalculated={item.daysCalculated}
                            Status={item.Status}
                            TimeStamp={item.TimeStamp}
                            key={index} />
                        </TouchableHighlight>

                )}/>
            </View>   
        );
    }
}
const styles=StyleSheet.create({
    card:{
        
    },
       
    

});