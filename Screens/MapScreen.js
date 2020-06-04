import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

export default class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
    this.getInitialState = this.getInitialState.bind(this);
    this.getCoordsFromName = this.getCoordsFromName.bind(this);

    this.state = {
      region: {},
      markedcar_list: [],
      markers: []
    };
  }
  componentWillMount() {
    this.getInitialState();
    var markerslist = this.state.markers;
    this.props.navigation.state.params.marker_list.forEach(ob => {
      var Title = ob.Brand.concat(" ", ob.Model, " ", ob.Variant, " ", ob.Year);
      var Description = ob.RatePerDay.concat(
        " Price per day",
        "  ",
        ob.Rating,
        " Stars"
      );
      markerslist.push({
        id: ob.doc,
        latlng: {
          latitude: ob.latitude,
          longitude: ob.longitude
        },
        title: Title,
        description: Description
      });
    });
    console.log(this.state.markers);
  }
  //async componentDidMount() {}

  getInitialState() {
    this.setState({
      region: this.props.navigation.state.params.region,
      markedcar_list: this.props.navigation.state.params.marker_list
    });
  }
  getCoordsFromName(loc) {
    this.setState({
      region: {
        latitude: loc.lat,
        longitude: loc.lng,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009
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
          <View style={styles.container}>
            <MapView
              region={this.state.region}
              onRegionChangeComplete={this.onRegionChangeComplete}
              style={{ width: "100%", height: "100%" }}
            >
              {this.state.markers.map(marker => {
                return (
                  <Marker
                    key={marker.id}
                    coordinate={marker.latlng}
                    title={marker.title}
                    description={marker.description}
                  />
                );
              })}
            </MapView>
          </View>
        ) : null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  card: {},
  container: {
    flex: 1
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center"
  }
});
