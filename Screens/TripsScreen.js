import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  FlatList,
  TouchableHighlight
} from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import ListedTrips from "../Components/ListedTrips";
import BookedTrips from "../Components/BookedTrips";
import { f, auth, database, storage, firestore } from "../config/Config.js";
const initialLayout = {
  height: 0,
  width: Dimensions.get("window").width
};

export default class TripsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ListedList: [],
      RentedList: [],
      refresh: false,
      loading: true,
      refresh1: false,
      loading1: true,
      index: 0,
      routes: [
        { key: "first", title: "Trips(Booked)" },
        { key: "second", title: "Trips(Listed)" }
      ]
    };
  }
  componentDidMount() {
    this.loadRentedList();
    this.loadListedList();
  }
  loadRentedList = () => {
    this.loadNew();
  };
  loadListedList = () => {
    this.loadNew2();
  };
  timeDifference(current, previous) {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + " seconds ago";
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + " minutes ago";
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + " hours ago";
    } else if (elapsed < msPerMonth) {
      return "approximately " + Math.round(elapsed / msPerDay) + " days ago";
    } else if (elapsed < msPerYear) {
      return (
        "approximately " + Math.round(elapsed / msPerMonth) + " months ago"
      );
    } else {
      return "approximately " + Math.round(elapsed / msPerYear) + " years ago";
    }
  }
  addToRentedFlatList2(RentedTrips_feed, data, userdetail) {
    var that = this;
    firestore
      .collection("Cars")
      .doc(data.ListingID)
      .get()
      .then(async doc => {
        const exists = doc.data() != null;
        if (exists) {
          car_details = doc.data();
          var startDay = new Date(data.StartDate).getDate();
          var startMonth = new Date(data.StartDate).getMonth();
          var endDay = new Date(data.EndDate).getDate();
          var endMonth = new Date(data.EndDate).getMonth();
          var Months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sept",
            "Oct",
            "Nov",
            "Dec"
          ];
          var startMonth1 = Months[startMonth];
          var endMonth1 = Months[endMonth];
          var timestamp = this.timeDifference(
            new Date().getTime(),
            data.TimeStamp
          );
          await RentedTrips_feed.push({
            Renter: userdetail.FullName,
            ID: data.UserID,
            Thumbnail: data.RenterProfilePhoto,
            Model: car_details.Model,
            Brand: car_details.Brand,
            Variant: car_details.Variant,
            Year: car_details.Year,
            startMonth: startMonth1,
            endMonth: endMonth1,
            startDay: startDay,
            endDay: endDay,
            Status: data.Status,
            TimeStamp: timestamp,
            CarPricePerDay: data.CarPricePerDay,
            AdditionalMiles: data.AdditionalMiles,
            LicenseNo: userdetail.LicenseNo,
            FullName: userdetail.FullName,
            NoOfUserTrips: userdetail.NoOfUserTrips,
            DetailsPhotoURL: car_details.PhotoURL1,
            AdditionalMilePrice: car_details.AdditionalMilePrice,
            Regno: car_details.Regno,
            DaysCalculated: data.DaysCalculated,
            TripTotal: data.TripTotal
          });
          that.setState({
            refresh: false,
            loading: false
          });
        }
      });
  }
  addToListedFlatList2(ListedTrips_feed, data, userdetail) {
    var that = this;
    firestore
      .collection("Cars")
      .doc(data.ListingID)
      .get()
      .then(async doc => {
        const exists = doc.data() != null;
        if (exists) {
          car_details = doc.data();
          var startDay = new Date(data.StartDate).getDate();
          var startMonth = new Date(data.StartDate).getMonth();
          var endDay = new Date(data.EndDate).getDate();
          var endMonth = new Date(data.EndDate).getMonth();
          var Months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sept",
            "Oct",
            "Nov",
            "Dec"
          ];
          var startMonth1 = Months[startMonth];
          var endMonth1 = Months[endMonth];
          var timestamp = this.timeDifference(
            new Date().getTime(),
            data.TimeStamp
          );
          await ListedTrips_feed.push({
            Thumbnail: data.ListerProfilePhoto,
            Model: car_details.Model,
            Brand: car_details.Brand,
            Variant: car_details.Variant,
            Year: car_details.Year,
            startMonth: startMonth1,
            endMonth: endMonth1,
            startDay: startDay,
            endDay: endDay,
            Status: data.Status,
            TimeStamp: timestamp,
            CarPricePerDay: data.CarPricePerDay,
            AdditionalMiles: data.AdditionalMiles,
            LicenseNo: userdetail.LicenseNo,
            FullName: userdetail.FullName,
            NoOfUserTrips: userdetail.NoOfUserTrips,
            DetailsPhotoURL: car_details.PhotoURL1,
            AdditionalMilePrice: car_details.AdditionalMilePrice,
            Regno: car_details.Regno,
            DaysCalculated: data.DaysCalculated,
            TripTotal: data.TripTotal
          });
          that.setState({
            refresh1: false,
            loading1: false
          });
        }
      });
  }
  addToRentedFlatList1(RentedTrips_feed, data) {
    var that = this;
    firestore
      .collection("Users")
      .doc(data.Lister)
      .get()
      .then(doc => {
        const exists = doc.data() !== null;
        if (exists) {
          userdetail = doc.data();
          that.addToRentedFlatList2(RentedTrips_feed, data, userdetail);
        }
      });
  }
  addToListedFlatList1(ListedTrips_feed, data) {
    var that = this;
    firestore
      .collection("Users")
      .doc(data.Renter)
      .get()
      .then(doc => {
        const exists = doc.data() !== null;
        if (exists) {
          userdetail = doc.data();
          that.addToListedFlatList2(ListedTrips_feed, data, userdetail);
        }
      });
  }
  loadNew2 = () => {
    this.setState({
      refresh1: true,
      ListedList: []
    });
    var that = this;
    firestore
      .collection("CompletedTrips")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          const exists = doc.data() !== null;
          if (exists) {
            data = doc.data();
            var ListedTrips_feed = that.state.ListedList;
            that.addToListedFlatList1(ListedTrips_feed, data);
          }
        });
      });
  };
  loadNew = () => {
    this.setState({
      refresh: true,
      RentedList: []
    });
    var that = this;
    firestore
      .collection("CompletedTrips")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          const exists = doc.data() !== null;
          if (exists) {
            data = doc.data();
            var RentedTrips_feed = that.state.RentedList;
            that.addToRentedFlatList1(RentedTrips_feed, data);
          }
        });
      });
  };
  ListedSelectedHandler(item) {
    this.props.navigation.navigate({
      routeName: "Third",
      params: {
        Model: item.Model,
        Brand: item.Brand,
        Variant: item.Variant,
        Year: item.Year,
        DaysCalculated: item.DaysCalculated,
        startMonth: item.startMonth,
        endMonth: item.endMonth,
        startDay: item.startDay,
        endDay: item.endDay,
        CarPricePerDay: item.CarPricePerDay,
        AdditionalMiles: item.AdditionalMiles,
        FullName: item.FullName,
        DetailsPhotoURL: item.DetailsPhotoURL,
        AdditionalMilePrice: item.AdditionalMilePrice,
        Regno: item.Regno,
        LicenseNo: item.LicenseNo,
        TripTotal: item.TripTotal
      }
    });
  }
  BookedSelectedHandler(item) {
    this.props.navigation.navigate({
      routeName: "Second",
      params: {
        Model: item.Model,
        Brand: item.Brand,
        Variant: item.Variant,
        Year: item.Year,
        startMonth: item.startMonth,
        endMonth: item.endMonth,
        startDay: item.startDay,
        endDay: item.endDay,
        CarPricePerDay: item.CarPricePerDay,
        AdditionalMiles: item.AdditionalMiles,
        FullName: item.FullName,
        DetailsPhotoURL: item.DetailsPhotoURL,
        AdditionalMilePrice: item.AdditionalMilePrice,
        Regno: item.Regno,
        TripTotal: item.TripTotal
      }
    });
  }

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} />;

  renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return (
          <View style={{ flex: 1, margin: 7 }}>
            <FlatList
              refreshing={this.state.refresh}
              onRefresh={this.loadRentedList}
              data={this.state.RentedList}
              contentContainerStyle={{ paddingBottom: 50 }}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableHighlight
                  onPress={() => this.BookedSelectedHandler(item)}
                >
                  <BookedTrips
                    Thumbnail={item.Thumbnail}
                    Lister={item.FullName}
                    Model={item.Model}
                    Variant={item.Variant}
                    Year={item.Year}
                    startMonth={item.startMonth}
                    endMonth={item.endMonth}
                    startDay={item.startDay}
                    endDay={item.endDay}
                    DaysCalculated={item.DaysCalculated}
                    Status={item.Status}
                    TimeStamp={item.TimeStamp}
                    TripTotal={item.TripTotal}
                    key={index}
                  />
                </TouchableHighlight>
              )}
            />
          </View>
        );
      case "second":
        return (
          <View style={{ flex: 1, margin: 7 }}>
            <FlatList
              refreshing={this.state.refresh1}
              onRefresh={this.loadListedList}
              data={this.state.ListedList}
              contentContainerStyle={{ paddingBottom: 50 }}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableHighlight
                  onPress={() => this.ListedSelectedHandler(item)}
                >
                  <ListedTrips
                    Thumbnail={item.Thumbnail}
                    Renter={item.FullName}
                    Model={item.Model}
                    Variant={item.Variant}
                    Year={item.Year}
                    startMonth={item.startMonth}
                    endMonth={item.endMonth}
                    startDay={item.startDay}
                    endDay={item.endDay}
                    DaysCalculated={item.DaysCalculated}
                    Status={item.Status}
                    TimeStamp={item.TimeStamp}
                    TripTotal={item.TripTotal}
                    key={index}
                  />
                </TouchableHighlight>
              )}
            />
          </View>
        );
      default:
        return null;
    }
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this.renderScene}
        renderHeader={this._renderHeader}
        onIndexChange={this._handleIndexChange}
        initialLayout={initialLayout}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 7
  }
});
