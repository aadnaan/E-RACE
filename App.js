import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Home from "./Screens/Home";
import MainNavigator from "./Navigation/MainNavigator";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { YellowBox } from "react-native";
import _ from "lodash";
import BookingDetails from "./Screens/BookingDetails";
import TripsScreen from "./Screens/TripsScreen";
import RequestList from "./Components/RequestList.js";
import ListedTrips from "./Components/ListedTrips";
import BookedDetailsScreen from "./Screens/BookedDetailsScreen";
import RentedDetailsScreen from "./Screens/RentedDetailsScreen";
import RequestDetail from "./Screens/RequestDetail";
import Chat from "./Screens/Chat";
import MapScreen from "./Screens/MapScreen";
import SearchScreen from "./Screens/SearchScreen";
import ListedCar from "./Components/ListedCar";
import ListedCarList from "./Screens/ListedCarList";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

const fetchFonts = () => {
  return Font.loadAsync({
    "Modern-Machine": require("./assets/fonts/Modern Machine.ttf"),
    "Patchwork-Color": require("./assets/fonts/PatchworkStitchlingsColor.ttf"),
    Patchwork: require("./assets/fonts/PatchworkStitchlings.ttf"),
    Seagram: require("./assets/fonts/Seagram.ttf"),
    Roboto_medium: require("./assets/fonts/Roboto-Medium.ttf")
  });
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setDataLoaded(true);
        }}
        onError={err => console.log(err)}
      />
    );
  }
  if (dataLoaded == true) {
    return (
      //<RequestDetail />
      //<BookingDetails/>
      //<MainNavigator />
      //<PinCar />
      //<RequestSentList />
      //<MapScreen />
      //<Testauto />
      //<SearchScreen />
      //<RequestList/>
      //<ListedTrips/>
      //<TripsScreen/>
      //<BookedDetailsScreen/>
      //<RentedDetailsScreen/>
      //<Chat />
      <ListedCarList />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
