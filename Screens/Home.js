import React, { Component } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  ImageBackground,
  Platform,
  ScrollView,
  FlatList,
  TouchableHighlight
} from "react-native";
import Cards from "../Components/Cards";
import { Input, Block } from "galio-framework";
import { theme, withGalio, GalioProvider, Icon } from "galio-framework";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign
} from "@expo/vector-icons";
import VehicleList from "../Components/VehicleList";
import { f, auth, database, storage, firestore } from "../config/Config.js";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { getLocation } from "../Services/location-service";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.carselectedHandler = this.carselectedHandler.bind(this);
    this.getCoordsFromName = this.getCoordsFromName.bind(this);
    this.currentgetcarsbyloc = this.currentgetcarsbyloc.bind(this);
    this.placeselectedhandler = this.placeselectedhandler.bind(this);
    this.currentlocplaceselectedhandler = this.currentlocplaceselectedhandler.bind(
      this
    );
    this.state = {
      region: {},
      region1: {},
      car_list: [],
      carlistloc: [],
      latlist: [],
      refresh: false,
      loading: true
    };
  }
  componentDidMount = () => {
    this.loadcarlist();
    this.setState({
      loading: false
    });
  };
  searchHandler = () => {
    this.props.navigation.navigate({
      routeName: "Third"
    });
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
            refresh: false,
            loading: false
          });
        }
      });
  };
  getCoordsFromName(loc) {
    this.setState({
      region: {
        latitude: loc.lat,
        longitude: loc.lng,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02
      }
    });
  }
  loadcarlist = () => {
    this.setState({
      refresh: true,
      car_list: []
    });
    var that = this;
    firestore
      .collection("Cars")
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
  };
  loadNew = () => {
    this.loadcarlist();
  };
  placeselectedhandler() {
    this.props.navigation.navigate({
      routeName: "Fifth",
      params: {
        region: this.state.region,
        marker_list: this.state.carlistloc
      }
    });
  }
  currentlocplaceselectedhandler() {
    this.props.navigation.navigate({
      routeName: "Fifth",
      params: {
        region: this.state.region1,
        marker_list: this.state.carlistloc
      }
    });
  }
  async currentgetcarsbyloc(next) {
    this.setState({
      carlistloc: [],
      latlist: []
    });
    var that = this;
    await firestore
      .collection("Cars")
      .where("Latitude", "<", this.state.region1.latitude + 0.017)
      .where("Latitude", ">", this.state.region1.latitude - 0.017)
      .get()
      .then(async snapshot => {
        await snapshot.docs.forEach(async doc => {
          const exists = doc.data() !== null;
          if (exists) {
            data = doc.data();
            var templatlist = this.state.latlist;
            await templatlist.push(doc.id);
          }
        });
      });
    var itemsprocessed = 0;
    await firestore
      .collection("Cars")
      .where("Longitude", "<", this.state.region1.longitude + 0.017)
      .where("Longitude", ">", this.state.region1.longitude - 0.017)
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(async doc => {
          const exists = doc.data() !== null;
          if (exists) {
            data = doc.data();
            let f = false;

            for (let i = 0; i < this.state.latlist.length; i++) {
              if (doc.id == this.state.latlist[i]) {
                f = true;
              }
            }
            if (f == true) {
              var carlistloc_feed = that.state.carlistloc;
              await that.addToCurrentlocFlatList1(
                carlistloc_feed,
                data,
                doc.id
              );
            }
            itemsprocessed++;
          }
          if (itemsprocessed === snapshot.size) {
            next();
          }
        });
      });
  }
  async selectedgetcarsbyloc() {
    this.setState({
      carlistloc: [],
      latlist: []
    });
    var that = this;
    await firestore
      .collection("Cars")
      .where("Latitude", "<", this.state.region.latitude + 0.017)
      .where("Latitude", ">", this.state.region.latitude - 0.017)
      .get()
      .then(async snapshot => {
        await snapshot.docs.forEach(async doc => {
          const exists = doc.data() !== null;
          if (exists) {
            data = doc.data();
            var templatlist = this.state.latlist;
            await templatlist.push(doc.id);
          }
        });
      });
    await firestore
      .collection("Cars")
      .where("Longitude", "<", this.state.region.longitude + 0.017)
      .where("Longitude", ">", this.state.region.longitude - 0.017)
      .get()
      .then(async snapshot => {
        await snapshot.docs.forEach(async doc => {
          const exists = doc.data() !== null;
          if (exists) {
            data = doc.data();
            id1 = doc.id;
            let f = false;
            for (let i = 0; i < this.state.latlist.length; i++) {
              if (doc.id == this.state.latlist[i]) {
                f = true;
              }
            }
            if (f == true) {
              var carlistloc_feed = that.state.carlistloc;
              await that.addToCurrentlocFlatList1(
                carlistloc_feed,
                data,
                doc.id1
              );
            }
          }
        });
      });
  }
  async addToCurrentlocFlatList1(carlistloc_feed, data, id1) {
    var that = this;
    await firestore
      .collection("Users")
      .doc(data.UserID)
      .get()
      .then(async doc => {
        const exists = doc.data() !== null;
        if (exists) {
          userdetail = doc.data();
          const count = Number(data.Rating);
          await carlistloc_feed.push({
            doc: id1,
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
            Description: data.Description,
            latitude: data.Latitude,
            longitude: data.Longitude
          });
        }
      });
  }

  render() {
    return (
      <View style={{ flexDirection: "column" }}>
        <View style={{ padding: 5, height: "60%" }}>
          <ImageBackground
            source={require("../assets/home.jpeg")}
            blurRadius={1.5}
            style={{
              height: "100%",
              width: "100%",
              alignItems: "center",
              paddingVertical: 10
            }}
            imageStyle={{ borderRadius: 10 }}
          >
            <Cards style={styles.CardContainer}>
              <TouchableHighlight
                style={{
                  height: "100%",
                  width: "100%",
                  borderColor: "#800080",
                  borderWidth: 2,
                  borderRadius: 20,
                  justifyContent: "center"
                }}
                onPress={() => this.searchHandler()}
              >
                <View style={{ flexDirection: "row", marginLeft: 8 }}>
                  <AntDesign
                    name="search1"
                    color={theme.COLORS.GREY}
                    size={20}
                    style={{ marginLeft: 15 }}
                  />
                  <View style={{ marginLeft: 4 }}>
                    <Text>Search by Brand,Model</Text>
                  </View>
                </View>
              </TouchableHighlight>
            </Cards>
            <View style={{ flex: 0.9, width: "95%", marginTop: 5 }}>
              <GooglePlacesAutocomplete
                placeholder="Search by location"
                styles={{
                  textInput: {
                    borderColor: "#800080",
                    borderWidth: 2,
                    borderRadius: 20,
                    marginTop: 0,
                    height: "100%"
                  },
                  textInputContainer: {
                    borderRadius: 10,
                    height: 50,
                    backgroundColor: "#FFFFFF",
                    alignItems: "center",
                    paddingVertical: 7,
                    justifyContent: "center"
                  },
                  listView: {
                    backgroundColor: "rgba(52, 52, 52, 0.8)"
                  }
                }}
                minLength={2}
                fetchDetails={true}
                autoFocus={true}
                returnKeyType={"search"} // Can be left out for default return key
                listViewDisplayed={false} // true/false/undefined
                onPress={(data, details = null) => {
                  this.setState({
                    region: {
                      latitude: details.geometry.location.lat,
                      longitude: details.geometry.location.lng,
                      latitudeDelta: 0.017,
                      longitudeDelta: 0.017
                    }
                  });
                  this.selectedgetcarsbyloc().then(() => {
                    this.carselectedHandler();
                  });
                }}
                query={{
                  key: "AIzaSyDG2_iNKCcaXNXwwXgqqiqDIMM4sRbThnI",
                  language: "en"
                }}
                nearbyPlacesAPI="GooglePlacesSearch"
                debounce={300}
              />
            </View>
            <TouchableHighlight
              onPress={async () => {
                await getLocation().then(data => {
                  this.setState({
                    region1: {
                      latitude: data.latitude,
                      longitude: data.longitude,
                      latitudeDelta: 0.017,
                      longitudeDelta: 0.017
                    }
                  });
                });
                this.currentgetcarsbyloc(() => {
                  this.currentlocplaceselectedhandler();
                });
              }}
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                alignSelf: "flex-end",
                marginHorizontal: 10,
                paddingVertical: 5
              }}
            >
              <Cards
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "center",
                  height: 50,
                  width: 50,
                  borderRadius: 25
                }}
              >
                <MaterialIcons
                  name="my-location"
                  color="#800080"
                  size={25}
                  style={{}}
                />
              </Cards>
            </TouchableHighlight>
          </ImageBackground>
        </View>
        <View style={{ padding: 5 }}>
          <Text
            style={{ fontSize: 14, fontWeight: "400", paddingHorizontal: 10 }}
          >
            Vehicles you may like
          </Text>
          <View style={{ height: 270 }}>
            {this.state.loading == true ? (
              <View>
                <Text>loading...</Text>
              </View>
            ) : (
              <FlatList
                horizontal={true}
                refreshing={this.state.refresh}
                onRefresh={this.loadNew}
                data={this.state.car_list}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <TouchableHighlight
                    onPress={() => this.carselectedHandler(item)}
                  >
                    <VehicleList
                      key={index}
                      imageuri={item.Thumbnail}
                      rating={item.Rating}
                      name={item.Brand}
                      Model={item.Model}
                      year={item.Year}
                    />
                  </TouchableHighlight>
                )}
              />
            )}
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  CardContainer: {
    flexDirection: "row",
    width: "95%",
    alignItems: "center",
    height: 50,
    paddingVertical: 7,
    paddingHorizontal: 10
  },
  inputContainer: {
    height: Platform.OS == "android" ? 30 : 20,
    width: 280,
    marginLeft: 8,
    fontSize: 2,
    borderColor: theme.COLORS.GREY,
    elevation: 4
  }
});
