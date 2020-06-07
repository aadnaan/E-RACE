import React, { Component } from "react";
import { Text, StyleSheet, View, Image, Alert } from "react-native";
import Cards from "../Components/Cards";
import { Rating, SearchBar } from "react-native-elements";
import { StrictMode } from "react";
import { Entypo } from "@expo/vector-icons";

import { Button } from "react-native-elements";

import { firestore } from "../config/Config.js";

export default class ListedCar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  putOnMarketHandler(next) {
    Alert.alert("Confirmation", "Are you sure", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel"
      },
      {
        text: "OK",
        onPress: async () => {
          await firestore
            .collection("Cars")
            .doc(this.props.docid)
            .update({
              Status: "Off Market"
            });
          next();
        }
      }
    ]);
  }
  putOffMarketHandler(next) {
    Alert.alert("Confirmation", "Are you sure", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel"
      },
      {
        text: "OK",
        onPress: async () => {
          await firestore
            .collection("Cars")
            .doc(this.props.docid)
            .update({
              Status: "On Market"
            });
          next();
        }
      }
    ]);
  }
  removeCarHandler(next) {
    Alert.alert("Confirmation", "Are you sure", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel"
      },
      {
        text: "OK",
        onPress: async () => {
          await firestore
            .collection("Cars")
            .doc(this.props.docid)
            .delete();
          next();
        }
      }
    ]);
  }

  render() {
    const { Thumbnail } = this.props;

    let Status1 = true;
    let Status2 = false;
    if (this.props.Status == "Off Market") {
      Status1 = false;
    } else {
      Status1 = true;
    }
    if (this.props.Status == "In Progress") {
      Status2 = true;
    }

    return (
      <Cards
        style={{ overflow: "hidden", marginVertical: 5, marginHorizontal: 5 }}
      >
        <View style={{ width: "100%", backgroundColor: "#0df40d" }}>
          <Text style={{ alignSelf: "center", fontWeight: "600" }}>
            {this.props.Status}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 10
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={styles.profileImgContainer}>
              <Image
                source={{
                  uri: Thumbnail
                }}
                style={styles.profileImg}
              />
            </View>
            <View style={{ marginVertical: 4, marginHorizontal: 4 }}>
              <Text style={{ fontSize: 13, color: "#800080" }}>
                Your{" "}
                <Text
                  style={{ fontSize: 14, fontWeight: "500", color: "black" }}
                >
                  {this.props.Brand} <Text>{this.props.Model} </Text>
                  <Text style={{ fontSize: 13, fontWeight: "500" }}>
                    {this.props.Variant}{" "}
                    <Text style={{ fontSize: 12, fontWeight: "500" }}>
                      {this.props.Year}
                    </Text>
                  </Text>
                </Text>
              </Text>

              <Text style={{ fontSize: 13, color: "#800080" }}>
                Regisitration:{" "}
                <Text
                  style={{ fontSize: 14, fontWeight: "500", color: "black" }}
                >
                  {this.props.Regno}{" "}
                </Text>
              </Text>
            </View>
          </View>
          <View
            style={{
              alignItems: "center",
              alignSelf: "center",
              marginVertical: 3
            }}
          >
            {Status1 == true ? (
              <Button
                onPress={() => {
                  this.putOnMarketHandler(() => {
                    this.props.loadRented();
                  });
                }}
                buttonStyle={{ backgroundColor: "#800080", borderRadius: 10 }}
                titleStyle={{ fontSize: 10, color: "#FFFFFF" }}
                title="List (On)"
                disabled={Status2}
                disabledStyle={{ opacity: 0.5, backgroundColor: "grey" }}
                disabledTitleStyle={{ color: "black" }}
              />
            ) : (
              <Button
                onPress={() => {
                  this.putOffMarketHandler(() => {
                    this.props.loadRented();
                  });
                }}
                buttonStyle={{ backgroundColor: "#800080", borderRadius: 10 }}
                titleStyle={{ fontSize: 10, color: "#FFFFFF" }}
                title="List (Off)"
                disabled={Status2}
                disabledStyle={{ opacity: 0.5, backgroundColor: "grey" }}
                disabledTitleStyle={{ color: "black" }}
              />
            )}
            <Button
              onPress={() => {
                this.removeCarHandler(() => {
                  this.props.loadRented();
                });
              }}
              buttonStyle={{
                backgroundColor: "#800080",
                borderRadius: 10,
                marginTop: 3
              }}
              titleStyle={{ fontSize: 10, color: "#FFFFFF" }}
              title="Remove"
              disabled={Status2}
              disabledStyle={{ opacity: 0.5, backgroundColor: "grey" }}
              disabledTitleStyle={{ color: "black" }}
            />
          </View>
        </View>
      </Cards>
    );
  }
}
const styles = StyleSheet.create({
  profileImgContainer: {
    height: 50,
    width: 70,
    borderRadius: 10,
    margin: 8,
    overflow: "hidden"
  },
  profileImg: {
    height: 45,
    width: 70,
    borderRadius: 10,
    resizeMode: "contain"
  }
});
