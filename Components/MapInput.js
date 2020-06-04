import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

function MapInput(props) {
  return (
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
        props.notifyChange(details.geometry.location);
      }}
      query={{
        key: "AIzaSyDG2_iNKCcaXNXwwXgqqiqDIMM4sRbThnI",
        language: "en"
      }}
      nearbyPlacesAPI="GooglePlacesSearch"
      debounce={300}
    />
  );
}
export default MapInput;
