import React, { Component } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  ImageBackground,
  Platform,
  ScrollView,
  Image,
  FlatList,
  TouchableHighlight,
  Dimensions
} from "react-native";
import Cards from "../Components/Cards";
import { Rating } from "react-native-elements";
import RequestList from "../Components/RequestList";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import { f, auth, database, storage, firestore } from "../config/Config.js";
import RequestSentList from "../Components/RequestSentList";
const initialLayout = {
  height: 0,
  width: Dimensions.get("window").width
};

export default class Requests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestList: [],
      requestSentList: [],
      refresh: false,
      loading: true,
      refresh1: false,
      loading1: true,
      index: 0,
      firstload: 0,
      routes: [
        { key: "first", title: "Trips(Booked)" },
        { key: "second", title: "Trips(Listed)" }
      ]
    };
  }
  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.loadBookingList();
      this.loadreqsentlist();
    });
  }
  componentWillUnmount() {
    // Remove the event listener before removing the screen from the stack
    this.focusListener.remove();
  }

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
  addToFlatList2(bookingRequest_feed, data, userdetail, id) {
    var that = this;
    firestore
      .collection("Cars")
      .doc(data.ListingID)
      .get()
      .then(doc => {
        const exists = doc.data() != null;
        if (exists) {
          car_details = doc.data();
          var startDay = new Date(data.StartDate).getDate();
          var startMonth = new Date(data.StartDate).getMonth();
          var startYear = new Date(data.StartDate).getFullYear();
          var endDay = new Date(data.EndDate).getDate();
          var endMonth = new Date(data.EndDate).getMonth();
          var endYear = new Date(data.EndDate).getFullYear();
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
          bookingRequest_feed.push({
            ListingID: data.ListingID,
            endM: endMonth,
            endYear: endYear,
            TripE: data.TripEnd,
            TripS: data.TripStart,
            AmountRec: data.AmountReceived,
            startM: startMonth,
            startYear: startYear,
            StartDate: data.StartDate,
            EndDate: data.EndDate,
            doc: id,
            RenterFirstName: data.RenterFirstName,
            ListerFirstName: data.ListerFirstName,
            RenterProfilePhoto: data.RenterProfilePhoto,
            ListerProfilePhoto: data.ListerProfilePhoto,
            ID: data.ListerID,
            ID2: data.RenterID,
            Thumbnail: data.RenterProfilePhoto,
            Model: car_details.Model,
            Brand: car_details.Brand,
            Variant: car_details.Variant,
            Year: car_details.Year,
            daysCalculated: data.daysCalculated,
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
            DescriptionOfTrip: data.DescriptionOfTrip
          });
          that.setState({
            refresh: false,
            loading: false
          });
        }
      });
  }
  addToReqSentFlatList2(RequestSent_feed, data, userdetail, id) {
    var that = this;
    firestore
      .collection("Cars")
      .doc(data.ListingID)
      .get()
      .then(doc => {
        const exists = doc.data() != null;
        if (exists) {
          car_details = doc.data();
          var startDay = new Date(data.StartDate).getDate();
          var startMonth = new Date(data.StartDate).getMonth();
          var startYear = new Date(data.StartDate).getFullYear();
          var endDay = new Date(data.EndDate).getDate();
          var endMonth = new Date(data.EndDate).getMonth();
          var endYear = new Date(data.EndDate).getFullYear();
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
          RequestSent_feed.push({
            ListingID: data.ListingID,
            endM: endMonth,
            endYear: endYear,
            TripE: data.TripEnd,
            TripS: data.TripStart,
            AmountRec: data.AmountReceived,
            startM: startMonth,
            startYear: startYear,
            StartDate: data.StartDate,
            EndDate: data.EndDate,
            doc: id,
            RenterFirstName: data.RenterFirstName,
            ListerFirstName: data.ListerFirstName,
            RenterProfilePhoto: data.RenterProfilePhoto,
            ListerProfilePhoto: data.ListerProfilePhoto,
            Lister: userdetail.Name,
            ID: data.ListerID,
            ID2: data.RenterID,
            Thumbnail: car_details.PhotoURL1,
            ListerPhoto: data.ListerProfilePhoto,
            Model: car_details.Model,
            Brand: car_details.Brand,
            Variant: car_details.Variant,
            Year: car_details.Year,
            daysCalculated: data.daysCalculated,
            startMonth: startMonth1,
            endMonth: endMonth1,
            startDay: startDay,
            endDay: endDay,
            Status: data.Status,
            TimeStamp: data.TimeStamp,
            CarPricePerDay: data.CarPricePerDay,
            AdditionalMiles: data.AdditionalMiles,
            LicenseNo: userdetail.LicenseNo,
            FullName: userdetail.FullName,
            NoOfUserTrips: userdetail.NoOfUserTrips,
            DetailsPhotoURL: car_details.PhotoURL1,
            AdditionalMilePrice: car_details.AdditionalMilePrice,
            Regno: car_details.Regno,
            DescriptionOfTrip: data.DescriptionOfTrip
          });
          that.setState({
            refresh1: false,
            loading1: false
          });
        }
      });
  }
  addToFlatList1(bookingRequest_feed, data, id) {
    var that = this;
    firestore
      .collection("Users")
      .doc(data.RenterID)
      .get()
      .then(doc => {
        const exists = doc.data() !== null;
        if (exists) {
          userdetail = doc.data();
          that.addToFlatList2(bookingRequest_feed, data, userdetail, id);
        }
      });
  }
  addToReqSentFlatList1(RequestSent_feed, data, id) {
    var that = this;
    firestore
      .collection("Users")
      .doc(data.ListerID)
      .get()
      .then(doc => {
        const exists = doc.data() !== null;
        if (exists) {
          userdetail = doc.data();
          that.addToReqSentFlatList2(RequestSent_feed, data, userdetail, id);
        }
      });
  }
  loadBookingList = () => {
    this.loadNew();
  };
  loadreqsentlist = () => {
    this.loadNew2();
  };
  loadNew2 = () => {
    this.setState({
      refresh1: true,
      requestSentList: []
    });
    var that = this;
    firestore
      .collection("BookingRequests")
      .where("Status", "in", [
        "Confirmed",
        "Pending",
        "Accepted",
        "In Progress"
      ])
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          const exists = doc.data() !== null;
          if (exists) {
            data = doc.data();
            var RequestSent_feed = that.state.requestSentList;
            that.addToReqSentFlatList1(RequestSent_feed, data, doc.id);
          }
        });
      });
  };
  loadNew = () => {
    this.setState({
      refresh: true,
      requestList: []
    });
    var that = this;
    firestore
      .collection("BookingRequests")
      .where("Status", "in", [
        "Confirmed",
        "Pending",
        "Accepted",
        "In Progress"
      ])
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          const exists = doc.data() !== null;
          if (exists) {
            data = doc.data();
            var bookingRequest_feed = that.state.requestList;
            that.addToFlatList1(bookingRequest_feed, data, doc.id);
          }
        });
      });
  };
  requestSelectedHandler(item) {
    var assignstartdate = new Date(
      parseInt(item.startYear, 10),
      parseInt(item.startM, 10),
      parseInt(item.startDay, 10),
      10,
      0,
      0,
      0
    );

    var curentdate = new Date();
    var seconds = (assignstartdate.getTime() - curentdate.getTime()) / 1000;
    var minutes = seconds / 60;
    var remmin = minutes % 60;

    var hours = minutes / 60;
    var assignenddate = new Date(
      parseInt(item.endYear, 10),
      parseInt(item.endM, 10),
      parseInt(item.endDay, 10),
      10,
      0,
      0,
      0
    );
    var seconds1 = (assignenddate.getTime() - curentdate.getTime()) / 1000;
    var minutes1 = seconds1 / 60;
    var remmin1 = minutes1 % 60;

    var hours1 = minutes1 / 60;
    this.props.navigation.navigate({
      routeName: "Second",
      params: {
        ListingID: item.ListingID,
        Status: item.Status,
        TripE: item.TripE,
        TripS: item.TripS,
        AmountRec: item.AmountRec,
        leftEndHour: Math.floor(hours1),
        leftEndMins: Math.floor(remmin1),
        cancelLeftHour: Math.floor(hours),
        cancelLeftMins: Math.floor(remmin),
        doc: item.doc,
        RenterFirstName: item.RenterFirstName,
        ListerFirstName: item.ListerFirstName,
        RenterProfilePhoto: item.RenterProfilePhoto,
        ListerProfilePhoto: item.ListerProfilePhoto,
        Renter: item.Renter,
        Lister: item.ID,
        Renter: item.ID2,
        Model: item.Model,
        Brand: item.Brand,
        Variant: item.Variant,
        Year: item.Year,
        daysCalculated: item.daysCalculated,
        startMonth: item.startMonth,
        endMonth: item.endMonth,
        startDay: item.startDay,
        endDay: item.endDay,
        CarPricePerDay: item.CarPricePerDay,
        AdditionalMiles: item.AdditionalMiles,
        LicenseNo: item.LicenseNo,
        FullName: item.FullName,
        NoOfUserTrips: item.NoOfUserTrips,
        DetailsPhotoURL: item.DetailsPhotoURL,
        AdditionalMilePrice: item.AdditionalMilePrice,
        Regno: item.Regno,
        Thumbnail: item.Thumbnail,
        DescriptionOfTrip: item.DescriptionOfTrip
      }
    });
  }
  requestSentSelectedHandler(item) {
    var assignstartdate = new Date(
      parseInt(item.startYear, 10),
      parseInt(item.startM, 10),
      parseInt(item.startDay, 10),
      10,
      0,
      0,
      0
    );

    var curentdate = new Date();
    var seconds = (assignstartdate.getTime() - curentdate.getTime()) / 1000;
    var minutes = seconds / 60;
    var remmin = minutes % 60;

    var hours = minutes / 60;
    var assignenddate = new Date(
      parseInt(item.endYear, 10),
      parseInt(item.endM, 10),
      parseInt(item.endDay, 10),
      10,
      0,
      0,
      0
    );
    var seconds1 = (assignenddate.getTime() - curentdate.getTime()) / 1000;
    var minutes1 = seconds1 / 60;
    var remmin1 = minutes1 % 60;

    var hours1 = minutes1 / 60;
    this.props.navigation.navigate({
      routeName: "fourth",
      params: {
        ListingID: item.ListingID,
        Status: item.Status,
        TripE: item.TripE,
        TripS: item.TripS,
        AmountRec: item.AmountRec,
        leftEndHour: Math.floor(hours1),
        leftEndMins: Math.floor(remmin1),
        cancelLeftHour: Math.floor(hours),
        cancelLeftMins: Math.floor(remmin),
        doc: item.doc,
        RenterFirstName: item.RenterFirstName,
        ListerFirstName: item.ListerFirstName,
        RenterProfilePhoto: item.RenterProfilePhoto,
        ListerProfilePhoto: item.ListerProfilePhoto,
        Lister: item.Lister,
        Lister: item.ID,
        Renter: item.ID2,
        Model: item.Model,
        Brand: item.Brand,
        Variant: item.Variant,
        Year: item.Year,
        daysCalculated: item.daysCalculated,
        startMonth: item.startMonth,
        endMonth: item.endMonth,
        startDay: item.startDay,
        endDay: item.endDay,
        CarPricePerDay: item.CarPricePerDay,
        AdditionalMiles: item.AdditionalMiles,
        LicenseNo: item.LicenseNo,
        FullName: item.FullName,
        NoOfUserTrips: item.NoOfUserTrips,
        DetailsPhotoURL: item.DetailsPhotoURL,
        AdditionalMilePrice: item.AdditionalMilePrice,
        Regno: item.Regno,
        Thumbnail: item.ListerPhoto
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
              refreshing={this.state.refresh1}
              onRefresh={this.loadreqsentlist}
              data={this.state.requestSentList}
              contentContainerStyle={{ paddingBottom: 50 }}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableHighlight
                  onPress={() => this.requestSentSelectedHandler(item)}
                >
                  <RequestSentList
                    Thumbnail={item.Thumbnail}
                    Lister={item.Lister}
                    Brand={item.Brand}
                    Model={item.Model}
                    Variant={item.Variant}
                    Year={item.Year}
                    startMonth={item.startMonth}
                    endMonth={item.endMonth}
                    startDay={item.startDay}
                    endDay={item.endDay}
                    daysCalculated={item.daysCalculated}
                    Status={item.Status}
                    TimeStamp={item.TimeStamp}
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
              refreshing={this.state.refresh}
              onRefresh={this.loadBookingList}
              data={this.state.requestList}
              contentContainerStyle={{ paddingBottom: 50 }}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableHighlight
                  onPress={() => this.requestSelectedHandler(item)}
                >
                  <RequestList
                    Thumbnail={item.Thumbnail}
                    Renter={item.RenterFirstName}
                    Brand={item.Brand}
                    Model={item.Model}
                    Variant={item.Variant}
                    Year={item.Year}
                    startMonth={item.startMonth}
                    endMonth={item.endMonth}
                    startDay={item.startDay}
                    endDay={item.endDay}
                    daysCalculated={item.daysCalculated}
                    Status={item.Status}
                    TimeStamp={item.TimeStamp}
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
  card: {}
});
