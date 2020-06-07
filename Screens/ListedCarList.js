import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight
} from "react-native";
import Cards from "../Components/Cards";

import { f, auth, database, storage, firestore } from "../config/Config.js";
import ListedCar from "../Components/ListedCar";

export default class ListedCarList extends Component {
  constructor(props) {
    super(props);
    this.loadRentedList = this.loadRentedList.bind(this);
    this.state = {
      refresh: false,
      loading: true,
      RentedList: []
    };
  }
  componentDidMount() {
    this.loadRentedList();
  }
  loadNew = () => {
    this.setState({
      refresh: true,
      RentedList: []
    });
    var that = this;
    firestore
      .collection("Cars")
      .get()
      .then(snapshot => {
        if (snapshot.size == 0) {
          that.setState({
            refresh: false,
            loading: false
          });
        }
        snapshot.docs.forEach(doc => {
          const exists = doc.data() !== null;
          if (exists) {
            data = doc.data();
            let id1 = doc.id;
            var RentedTrips_feed = that.state.RentedList;
            RentedTrips_feed.push({
              CarID: id1,
              ID: data.UserID,
              URL: [data.PhotoURL1, data.PhotoURL2],
              Thumbnail: data.PhotoURL1,
              Model: data.Model,
              Brand: data.Brand,
              Variant: data.Variant,
              Year: data.Year,
              Regno: data.Regno,
              Status: data.Status
            });
            that.setState({
              refresh: false,
              loading: false
            });
          }
        });
      });
  };
  loadRentedList = () => {
    this.loadNew();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Cards
          style={{
            flex: 0.96,
            marginHorizontal: 7,
            marginTop: 10,
            marginBottom: 10
          }}
        >
          <FlatList
            refreshing={this.state.refresh}
            onRefresh={this.loadRentedList}
            data={this.state.RentedList}
            contentContainerStyle={{ paddingBottom: 50 }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <ListedCar
                Thumbnail={item.Thumbnail}
                Brand={item.Brand}
                Model={item.Model}
                Variant={item.Variant}
                Year={item.Year}
                Regno={item.Regno}
                Status={item.Status}
                docid={item.CarID}
                loadRented={this.loadRentedList}
                key={index}
              />
            )}
          />
        </Cards>
        <View
          style={{
            flexDirection: "row",
            flex: 0.06,
            justifyContent: "space-evenly",
            alignItems: "center",
            backgroundColor: "#D3D3D3"
          }}
        >
          <TouchableHighlight
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#800080",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={{ color: "#FFFFFF", fontSize: 20, fontWeight: "700" }}>
              Add New Car
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  card: {}
});
