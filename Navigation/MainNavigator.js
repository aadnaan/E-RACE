import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Home from '../Screens/Home';
import SelectedCar from '../Screens/SelectedCar';
import SearchScreen from '../Screens/SearchScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import ListYourCar from '../Screens/ListYourCar';

const MainNavigator = createStackNavigator({
  
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
  
},{initialRouteName:'First',headerLayoutPreset: 'center'});
export const TabNavigator = createBottomTabNavigator({
  Home: { screen: MainNavigator },
  List: { screen: ListYourCar },
  Profile: { screen: ProfileScreen },
}, {
  order: ['Home', 'List', 'Profile'],
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
