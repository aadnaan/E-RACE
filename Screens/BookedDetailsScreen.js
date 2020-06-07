import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  TextInput,
  Alert
} from "react-native";
import Cards from "../Components/Cards";
import { Entypo } from "@expo/vector-icons";
import { Button } from "react-native-elements";

import { f, auth, database, storage, firestore } from "../config/Config.js";

export default class BookedDetailsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      complainStatus: false,
      complainTitle: "",
      complainDescription: ""
    };
  }
  componentDidMount() {}
  registerComplainHandler() {
    if (
      this.state.complainTitle.length > 3 &&
      this.state.complainDescription.length > 15
    ) {
      Alert.alert("Confirmation", "Are you sure", [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            // var date=new Date()
            // var st=date.getHours().toString()+":"+date.getMinutes().toString()+":"+date.getSeconds().toString();
            let item = this.props.navigation.state.params;
            firestore.collection("Complains").add({
              CompleteTripID: item.docid,
              ListingID: item.ListingID,
              BookingRequestID: item.BookingRequestID,
              RenterID: item.RenterID,
              ListerID: item.ListerID,
              Title: this.state.complainTitle,
              Description: this.state.complainDescription,
              Complainant: "Renter"
            });
            this.props.navigation.goBack();
          }
        }
      ]);
    } else {
      Alert.alert(
        "Title should be greater than 3 letters",
        "Description should be greater than 15 letters",
        [{ text: "OK", onPress: () => {} }]
      );
    }
  }

  render() {
    let Booked_Details = this.props.navigation.state.params;
    let { DetailsPhotoURL } = Booked_Details;
    let complainStatus = this.state.complainStatus;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <Cards style={{ margin: 10, padding: 10 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{}}>
                <Text
                  style={{ fontSize: 14, fontWeight: "500", color: "#800080" }}
                >
                  Lister :{" "}
                  <Text
                    style={{ fontSize: 16, fontWeight: "500", color: "black" }}
                  >
                    {Booked_Details.FullName}
                  </Text>
                </Text>
                <Text
                  style={{ fontSize: 14, fontWeight: "500", color: "#800080" }}
                >
                  Vehicle:{" "}
                  <Text
                    style={{ fontSize: 16, fontWeight: "500", color: "black" }}
                  >
                    {Booked_Details.Model}{" "}
                    <Text style={{ fontSize: 14, fontWeight: "500" }}>
                      {Booked_Details.Variant}{" "}
                      <Text style={{ fontSize: 12, fontWeight: "500" }}>
                        {Booked_Details.Year}
                      </Text>
                    </Text>
                  </Text>
                </Text>
                <Text
                  style={{ fontSize: 14, fontWeight: "500", color: "#800080" }}
                >
                  Registration:{" "}
                  <Text
                    style={{ fontSize: 16, fontWeight: "500", color: "black" }}
                  >
                    ASD-567
                  </Text>
                </Text>
              </View>
              <View style={{}}>
                <Image
                  style={{ width: 130, height: 80 }}
                  resizeMode="contain"
                  source={{ uri: DetailsPhotoURL }}
                />
              </View>
            </View>
          </Cards>
          <Cards style={{ margin: 10, padding: 10 }}>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 14, fontWeight: "500" }}>
                Trip Dates
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  marginTop: 8
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={{ fontSize: 16, fontWeight: "600", color: "grey" }}
                  >
                    {Booked_Details.startMonth}{" "}
                    <Text>{Booked_Details.startDay}</Text>
                  </Text>
                  <Text
                    style={{ fontSize: 13, fontWeight: "500", color: "grey" }}
                  >
                    10:00<Text> AM</Text>
                  </Text>
                </View>
                <Entypo
                  name="arrow-right"
                  color={"#800080"}
                  size={20}
                  style={{ marginLeft: 5, marginTop: 10 }}
                />
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={{ fontSize: 16, fontWeight: "600", color: "grey" }}
                  >
                    {Booked_Details.endMonth}{" "}
                    <Text>{Booked_Details.endDay}</Text>
                  </Text>
                  <Text
                    style={{ fontSize: 13, fontWeight: "500", color: "grey" }}
                  >
                    10:00<Text> AM</Text>
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginVertical: 18,
                  width: "95%",
                  alignSelf: "center",
                  borderBottomColor: "grey",
                  borderBottomWidth: 1
                }}
              />
              <Text style={{ fontSize: 14, fontWeight: "500" }}>
                Price Details
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 30,
                  paddingTop: 5,
                  marginTop: 10
                }}
              >
                <Text
                  style={{ fontSize: 14, fontWeight: "600", color: "#3c3c3c" }}
                >
                  Trip Price
                </Text>
                <Text
                  style={{ fontSize: 14, fontWeight: "600", color: "#3c3c3c" }}
                >
                  Rs.
                  <Text>
                    {Booked_Details.CarPricePerDay}
                    <Text>/day</Text>
                  </Text>
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 30,
                  paddingTop: 5
                }}
              >
                <Text
                  style={{ fontSize: 14, fontWeight: "600", color: "#3c3c3c" }}
                >
                  Trip Fee
                </Text>
                <Text
                  style={{ fontSize: 14, fontWeight: "600", color: "#3c3c3c" }}
                >
                  Rs.
                  <Text>
                    {parseInt(Booked_Details.CarPricePerDay) * 0.1}
                    <Text>/day</Text>
                  </Text>
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 30,
                  paddingTop: 5
                }}
              >
                <Text
                  style={{ fontSize: 14, fontWeight: "600", color: "#3c3c3c" }}
                >
                  500<Text> total miles</Text>
                </Text>
                <Text
                  style={{ fontSize: 14, fontWeight: "600", color: "#3c3c3c" }}
                >
                  Free
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 30,
                  paddingTop: 5
                }}
              >
                <Text
                  style={{ fontSize: 14, fontWeight: "600", color: "#3c3c3c" }}
                >
                  {Booked_Details.AdditionalMiles}
                  <Text>-Additional Miles</Text>
                </Text>
                <Text
                  style={{ fontSize: 14, fontWeight: "600", color: "#3c3c3c" }}
                >
                  {Booked_Details.AdditionalMiles}
                  <Text>
                    {" "}
                    x Rs.<Text>{Booked_Details.AdditionalMilePrice}</Text>
                  </Text>
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 30,
                  paddingTop: 5
                }}
              >
                <Text style={{ fontSize: 15, fontWeight: "600" }}>
                  Trip Total
                </Text>
                <Text style={{ fontSize: 15, fontWeight: "600" }}>
                  Rs.
                  <Text style={{ fontSize: 15, fontWeight: "600" }}>
                    {Booked_Details.TripTotal}
                  </Text>
                </Text>
              </View>
            </View>
          </Cards>
          {complainStatus === false ? (
            <Cards
              style={{
                margin: 10,
                padding: 10,
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: "500" }}>
                Any Complains?
              </Text>
              <Button
                onPress={() => {
                  this.setState({
                    complainStatus: true
                  });
                }}
                buttonStyle={{ width: 80, height: 20 }}
                titleStyle={{ fontSize: 14, color: "#0df40d" }}
                title="Click here"
                type="clear"
              />
            </Cards>
          ) : (
            <Cards
              style={{
                margin: 10,
                padding: 10,
                justifyContent: "space-evenly"
              }}
            >
              <View style={{ marginVertical: 10, alignSelf: "center" }}>
                <Text style={{ fontSize: 20, fontWeight: "700" }}>
                  Enter Complain Details
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  height: 35
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "500" }}>Title</Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: "#800080",
                    height: 30,
                    paddingHorizontal: 6,
                    width: "70%"
                  }}
                  onChangeText={text => {
                    this.setState({
                      complainTitle: text
                    });
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "flex-start",
                  height: 105,
                  marginTop: 5
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "500" }}>
                  Description
                </Text>
                <TextInput
                  multiline={true}
                  numberOfLines={10}
                  style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: "#800080",
                    textAlignVertical: "top",
                    height: 100,
                    width: "70%",
                    paddingHorizontal: 6,
                    paddingVertical: 6
                  }}
                  onChangeText={text => {
                    this.setState({
                      complainDescription: text
                    });
                  }}
                />
              </View>
              <View style={{ marginVertical: 10, alignSelf: "center" }}>
                <Button
                  onPress={() => {
                    this.registerComplainHandler();
                  }}
                  buttonStyle={{ backgroundColor: "#800080" }}
                  titleStyle={{ fontSize: 18, color: "#FFFFFF" }}
                  title="Register"
                />
              </View>
            </Cards>
          )}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  card: {}
});
