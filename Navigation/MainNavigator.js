import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import Home from "../Screens/Home";
import SelectedCar from "../Screens/SelectedCar";
import SearchScreen from "../Screens/SearchScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import ListYourCar from "../Screens/ListYourCar";
import Requests from "../Screens/Requests";
import TripsScreen from "../Screens/TripsScreen";
import BookingDetails from "../Screens/BookingDetails";
import RequestDetail from "../Screens/RequestDetail";
import RentedDetailsScreen from "../Screens/RentedDetailsScreen";
import BookedDetailsScreen from "../Screens/BookedDetailsScreen";
import Chat from "../Screens/Chat";
import RequestSentDetail from "../Screens/RequestSentDetail";
import MapScreen from "../Screens/MapScreen";

const RequestNavigator = createStackNavigator(
  {
    First: {
      screen: Requests,
      navigationOptions: {
        headerTitle: "Booking Requests",
        headerTitleStyle: {}
      }
    },
    Second: {
      screen: RequestDetail,
      navigationOptions: {
        headerTitle: "Request Received Details",
        headerTitleStyle: {}
      }
    },
    Third: {
      screen: Chat
    },
    fourth: {
      screen: RequestSentDetail,
      navigationOptions: {
        headerTitle: "Request Sent Details",
        headerTitleStyle: {}
      }
    }
  },
  { initialRouteName: "First", headerLayoutPreset: "center" }
);
const CompletedTripsNavigator = createStackNavigator(
  {
    First: {
      screen: TripsScreen,
      navigationOptions: {
        headerTitle: "Completed Trips",
        headerTitleStyle: {}
      }
    },
    Second: {
      screen: BookedDetailsScreen,
      navigationOptions: {
        headerTitle: "Trip Details",
        headerTitleStyle: {}
      }
    },
    Third: {
      screen: RentedDetailsScreen,
      navigationOptions: {
        headerTitle: "Trip Details",
        headerTitleStyle: {}
      }
    }
  },
  { initialRouteName: "First", headerLayoutPreset: "center" }
);
const HomeNavigator = createStackNavigator(
  {
    First: {
      screen: Home,
      navigationOptions: {
        headerTitle: "Home",
        headerTitleStyle: {},
        headerStyle: { backgroundColor: "#800080" }
      }
    },
    Second: {
      screen: SelectedCar,
      navigationOptions: {
        headerTitle: "Selected Vehicle",
        headerTitleStyle: {}
      }
    },
    Third: {
      screen: SearchScreen,
      navigationOptions: {
        headerShown: false
      }
    },
    Fourth: {
      screen: BookingDetails,
      navigationOptions: {
        headerTitle: "Booking Details"
      }
    },
    Fifth: {
      screen: MapScreen,
      navigationOptions: {
        headerTitle: "Map"
      }
    }
  },
  { initialRouteName: "First", headerLayoutPreset: "center" }
);
HomeNavigator.navigationOptions = ({ navigation }) => {
  return {
    tabBarVisible: navigation.state.index === 0
  };
};
RequestNavigator.navigationOptions = ({ navigation }) => {
  return {
    tabBarVisible: navigation.state.index === 0
  };
};
export const TabNavigator = createBottomTabNavigator(
  {
    Home: { screen: HomeNavigator },
    List: { screen: ListYourCar },
    Profile: { screen: ProfileScreen },
    Requests: { screen: RequestNavigator },
    Trips: { screen: CompletedTripsNavigator }
  },
  {
    order: ["Home", "List", "Requests", "Trips", "Profile"],
    initialRouteName: "Home",
    tabBarOptions: {
      activeTintColor: "#e91e63",
      labelStyle: {
        fontSize: 16,
        alignSelf: "center"
      },
      style: {
        alignItems: "center"
      }
    }
  }
);
export default createAppContainer(TabNavigator);
