import React, { Component } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  ImageBackground,
  Platform,
  TouchableHighlight,
  FlatList,
  Keyboard
} from "react-native";
import Cards from "../Components/Cards";
import { Rating, SearchBar } from "react-native-elements";
import SearchList from "../Components/SearchList";
import { f, auth, database, storage, firestore } from "../config/Config.js";
import { FontAwesome5 } from "@expo/vector-icons";
import firebase from "firebase";
import { NavigationBar } from "navigationbar-react-native";

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.carselectedHandler = this.carselectedHandler.bind(this);
    this.textChange = this.textChange.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.state = {
      search: "",
      refresh: false,
      car_list: []
    };
  }

  addToFlatList1 = (car_feed, data) => {
    var that = this;
    firestore
      .collection("Users")
      .doc(data.UserID)
      .get()
      .then(doc => {
        const exists = doc.data() !== null;
        if (exists) {
          userdetail = doc.data();
          const count = Number(data.Rating);
          car_feed.push({
            Lister: userdetail.Name,
            ID: data.UserID,
            URL: [data.PhotoURL1, data.PhotoURL2],
            Thumbnail: data.PhotoURL1,
            Model: data.Model,
            Brand: data.Brand,
            Variant: data.Variant,
            Year: data.Year,
            Doors: data.Doors,
            Seats: data.Seats,
            Transmission: data.Transmission,
            Regno: data.Regno,
            Rating: count,
            NoOfTrips: data.NoOfTrips,
            MilesAllowed: data.MilesAllowed,
            RatePerDay: data.RatePerDay,
            Pickup: data.Pickup,
            AdditionalMilePrice: data.AdditionalMilePrice,
            PetrolMilesPerLitre: data.PetrolMilesPerLitre,
            CNGMilesPerKG: data.CNGMilesPerKG,
            Description: data.Description
          });
          that.setState({
            refresh: false
          });
        }
      });
  };
  updateSearch() {
    var queryvalue = this.state.search;
    this.setState({
      refresh: true,
      car_list: []
    });
    this.fetchdata(queryvalue);
  }
  async fetchdata(query) {
    let res = query.split(" ");
    let str = " ";
    if (res.length > 1) {
      str = res[1];
    }
    that = this;
    if (query.length > 0) {
      await firestore
        .collection("Cars")
        .where("Brand", "in", [res[0], str])
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            const exists = doc.data() !== null;
            if (exists) {
              data = doc.data();
              var car_feed = that.state.car_list;
              that.addToFlatList1(car_feed, data);
            }
          });
        });
      firestore
        .collection("Cars")
        .where("Model", "in", [res[0], str])
        .get()
        .then(snapshot2 => {
          snapshot2.docs.forEach(async doc => {
            const exists2 = doc.data() !== null;
            if (exists2) {
              data = doc.data();
              var car_feed = that.state.car_list;
              await that.addToFlatList1(car_feed, data);
            }
          });
        });
    } else {
      this.setState({
        refresh: false
      });
    }
  }
  loadNew = () => {
    this.updateSearch();
  };
  textChange(search) {
    this.setState({
      search
    });
  }
  backButtonHandler = () => {
    this.props.navigation.goBack();
  };
  carselectedHandler = item => {
    this.props.navigation.navigate({
      routeName: "Second",
      params: {
        Lister: item.Lister,
        ID: item.ID,
        URL: item.URL,
        Model: item.Model,
        Brand: item.Brand,
        Variant: item.Variant,
        Year: item.Year,
        Doors: item.Doors,
        Seats: item.Seats,
        Transmission: item.Transmission,
        Regno: item.Regno,
        Rating: item.Rating,
        NoOfTrips: item.NoOfTrips,
        MilesAllowed: item.MilesAllowed,
        RatePerDay: item.RatePerDay,
        Pickup: item.Pickup,
        AdditionalMilePrice: item.AdditionalMilePrice,
        CNGMilesPerKG: item.CNGMilesPerKG,
        PetrolMilesPerLitre: item.PetrolMilesPerLitre,
        Description: item.Description
      }
    });
  };

  render() {
    const newArray = [];
    this.state.car_list.forEach(obj => {
      if (!newArray.some(o => o.ID === obj.ID)) {
        newArray.push({ ...obj });
      }
    });
    return (
      <View style={{ flex: 1 }}>
        <NavigationBar
          componentLeft={() => (
            <View style={{ marginBottom: 4, marginLeft: 5 }}>
              <TouchableHighlight onPress={this.backButtonHandler}>
                <FontAwesome5 name="chevron-left" color={"#fff"} size={20} />
              </TouchableHighlight>
            </View>
          )}
          componentCenter={() => (
            <View
              style={{
                width: "80%",
                borderWidth: 0.5,
                paddingHorizontal: 5,
                borderRadius: 10,
                backgroundColor: "#fff"
              }}
            >
              <TextInput
                placeholder="Search by Brand/Model"
                onChangeText={this.textChange}
                onSubmitEditing={this.updateSearch}
              />
            </View>
          )}
          componentRight={() => (
            <View style={{ marginBottom: 4, marginRight: 5 }}>
              <TouchableHighlight
                onPress={() => {
                  this.updateSearch();
                  Keyboard.dismiss();
                }}
              >
                <FontAwesome5
                  name="check"
                  color={"#fff"}
                  size={20}
                  style={{}}
                />
              </TouchableHighlight>
            </View>
          )}
          navigationBarStyle={{
            padding: 5,
            alignItems: "flex-end",
            height: 70,
            backgroundColor: "#800080",
            borderBottomWidth: 1
          }}
          statusBarStyle={{
            barStyle: "light-content",
            backgroundColor: "#800080"
          }}
        />
        <Cards style={{ marginHorizontal: 7, marginTop: 27, marginBottom: 10 }}>
          <FlatList
            refreshing={this.state.refresh}
            onRefresh={this.loadNew}
            data={newArray}
            contentContainerStyle={{ paddingBottom: 50 }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableHighlight onPress={() => this.carselectedHandler(item)}>
                <SearchList
                  Lister={item.Lister}
                  imageUri={item.Thumbnail}
                  Brand={item.Brand}
                  Model={item.Model}
                  Variant={item.Variant}
                  Year={item.Year}
                  Rating={item.Rating}
                  NoOfTrips={item.NoOfTrips}
                  key={index}
                />
              </TouchableHighlight>
            )}
          />
        </Cards>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  card: {}
});
