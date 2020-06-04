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
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
export default class Testauto extends Component {
  componentDidMount() {}

  render() {
    return (
      <View style={{ flex: 1 }}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          query={{
            key: "AIzaSyDG2_iNKCcaXNXwwXgqqiqDIMM4sRbThnI",
            language: "en"
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  card: {}
});
