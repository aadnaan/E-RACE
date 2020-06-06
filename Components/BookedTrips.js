import React, { Component } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  ImageBackground,
  Platform,
  ScrollView,
  Image
} from "react-native";
import Cards from "../Components/Cards";
import { Rating, SearchBar } from "react-native-elements";
import { StrictMode } from "react";
import { Entypo } from "@expo/vector-icons";

export default class BookedTrips extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { Thumbnail } = this.props;
    return (
      <Cards style={{ overflow: "hidden", marginVertical: 4 }}>
        <View style={{ width: "100%", backgroundColor: "#0df40d" }}>
          <Text style={{ alignSelf: "center", fontWeight: "600" }}>
            {this.props.Status}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 3
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={styles.profileImgContainer}>
              <Image source={{ uri: Thumbnail }} style={styles.profileImg} />
            </View>
            <View style={{ marginVertical: 4 }}>
              <Text
                style={{ fontSize: 13, fontWeight: "400", color: "#800080" }}
              >
                Vehicle Owner:{" "}
                <Text
                  style={{ fontSize: 13, fontWeight: "500", color: "black" }}
                >
                  {this.props.Lister}
                </Text>
              </Text>
              <Text style={{ fontSize: 13, color: "#800080" }}>
                Vehicle:{" "}
                <Text
                  style={{ fontSize: 14, fontWeight: "500", color: "black" }}
                >
                  {this.props.Model}{" "}
                  <Text style={{ fontSize: 13, fontWeight: "500" }}>
                    {this.props.Variant}{" "}
                  </Text>
                  <Text style={{ fontSize: 12, fontWeight: "500" }}>
                    {this.props.Year}
                  </Text>
                </Text>
              </Text>
              <Text style={{ fontSize: 13, color: "#800080" }}>
                For{" "}
                <Text
                  style={{ fontSize: 14, fontWeight: "500", color: "black" }}
                >
                  {this.props.DaysCalculated}{" "}
                  <Text style={{ fontSize: 13, fontWeight: "500" }}>Days</Text>
                </Text>
              </Text>
              <Text style={{ fontSize: 13, color: "#800080" }}>
                Trip total:{" "}
                <Text
                  style={{ fontSize: 14, fontWeight: "500", color: "black" }}
                >
                  Rs.{" "}
                  <Text style={{ fontSize: 13, fontWeight: "500" }}>
                    {this.props.TripTotal}
                  </Text>
                </Text>
              </Text>
            </View>
          </View>
          <View
            style={{
              alignItems: "center",
              alignSelf: "center",
              marginHorizontal: 5
            }}
          >
            <Text style={{ color: "grey", fontSize: 13, fontWeight: "500" }}>
              {this.props.startMonth} <Text>{this.props.startDay}</Text>
            </Text>
            <Entypo name="arrow-down" color={"#800080"} size={15} style={{}} />
            <Text style={{ color: "grey", fontSize: 13, fontWeight: "500" }}>
              {this.props.endMonth} <Text>{this.props.endDay}</Text>
            </Text>
          </View>
        </View>
      </Cards>
    );
  }
}
const styles = StyleSheet.create({
  profileImgContainer: {
    height: 70,
    width: 100,
    borderRadius: 5,
    margin: 8
  },
  profileImg: {
    height: 70,
    width: 100,
    borderRadius: 5
  }
});
