import React, { Component } from "react";
import { StyleSheet, View, Image, TouchableHighlight } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { getLocation } from "../Services/location-service";
import Cards from "../Components/Cards";

import { Button } from "react-native-elements";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign
} from "@expo/vector-icons";
export default class PinCar extends Component {
  constructor(props) {
    super(props);
    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
    this.getInitialState = this.getInitialState.bind(this);

    this.state = {
      region: {},
      x: {},
      markedcar_list: [],
      markers: []
    };
  }
  componentDidMount() {
    this.getInitialState();
  }
  getInitialState() {
    this.setState({
      region: {
        latitude: 25.678989,
        longitude: 67.435689,
        latitudeDelta: 0.017,
        longitudeDelta: 0.017
      },
      x: {
        latitude: 25.678989,
        longitude: 67.435689
      }
    });
  }
  async onRegionChangeComplete(region) {
    await this.setState({ region });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.region["latitude"] ? (
          <View style={{ flex: 1 }}>
            <MapView
              region={this.state.region}
              onRegionChangeComplete={this.onRegionChangeComplete}
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
              }}
            >
              <Marker
                draggable
                coordinate={this.state.x}
                onDragEnd={e => {
                  this.setState({ x: e.nativeEvent.coordinate });
                  console.log(this.state.x);
                }}
              />
            </MapView>
            <View style={{ flex: 1 }}>
              <View style={{ flex: 0.5, margin: 10 }}>
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
                      },
                      x: {
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng
                      }
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

              <View
                style={{
                  flex: 1,
                  alignSelf: "flex-end",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  padding: 50,
                  width: "100%"
                }}
              >
                <Cards
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "flex-end"
                  }}
                >
                  <Button
                    //buttonStyle={{ width: 0, height: 40 }}
                    titleStyle={{ fontSize: 16, color: "#800080" }}
                    title="Confirm"
                    type="clear"
                  />
                </Cards>
                <TouchableHighlight
                  onPress={async () => {
                    await getLocation().then(data => {
                      this.setState({
                        region: {
                          latitude: data.latitude,
                          longitude: data.longitude,
                          latitudeDelta: 0.017,
                          longitudeDelta: 0.017
                        },
                        x: {
                          latitude: data.latitude,
                          longitude: data.longitude
                        }
                      });
                    });
                  }}
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 25,
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "flex-end"
                  }}
                >
                  <Cards
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
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
              </View>
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  card: {}
});
