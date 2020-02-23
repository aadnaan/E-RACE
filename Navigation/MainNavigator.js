import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Home from '../Screens/Home';
import SelectedCar from '../Screens/SelectedCar';
import SearchScreen from '../Screens/SearchScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import ListYourCar from '../Screens/ListYourCar';
import Requests from '../Screens/Requests';
import TripsScreen from '../Screens/TripsScreen';
import BookingDetails from '../Screens/BookingDetails';

const RequestNavigator=createStackNavigator({
  First:{
    screen:Requests,
    navigationOptions:{
      headerTitle:'Booking Requests',
      headerTitleStyle: {},
    }
  }
},{initialRouteName:'First',headerLayoutPreset: 'center'})
const CompletedTripsNavigator=createStackNavigator({
  First:{
    screen:TripsScreen,
    navigationOptions:{
      headerTitle:'Completed Trips',
      headerTitleStyle: {},
    }
  }
},{initialRouteName:'First',headerLayoutPreset: 'center'})
const HomeNavigator = createStackNavigator({
  First:{
    screen:Home,
    navigationOptions:{
      headerTitle:'Home',
      headerTitleStyle: { },
    }
  },
  Second:{
    screen:SelectedCar,
    navigationOptions:{
      headerTitle:'Selected Vehicle',
      headerTitleStyle: { },
    }
  },
  Third:{
    screen:SearchScreen,
    navigationOptions:{
      headerShown:false
    }
  },
  Fourth:{
    screen:BookingDetails,
    navigationOptions:{
      headerTitle:"Booking Details"
    }
  }
  
},{initialRouteName:'First',headerLayoutPreset: 'center'});
HomeNavigator.navigationOptions = ({ navigation }) => {
  return {
    tabBarVisible: navigation.state.index === 0,
  };
};
export const TabNavigator = createBottomTabNavigator({
  Home: { screen: HomeNavigator },
  List: { screen: ListYourCar },
  Profile: { screen: ProfileScreen },
  Requests:{screen:RequestNavigator},
  CompletedTrips:{screen:CompletedTripsNavigator}
}, {
  order: ['Home', 'List','Requests','CompletedTrips','Profile'],
  initialRouteName: 'Home',
  tabBarOptions: {
    activeTintColor: '#e91e63',
    labelStyle: {
      fontSize: 16,
      alignSelf:'center'
    },
    style: {
      alignItems:'center'
    },
  }
});
export default createAppContainer(TabNavigator);
