import React, {Component} from 'react';
import { View, StyleSheet, Dimensions ,Text} from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import ListedTrips from '../Components/ListedTrips';
import BookedTrips from '../Components/BookedTrips';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

const FirstRoute = () => <View style={[ styles.container]} ><ListedTrips/>
<ListedTrips/>
<ListedTrips/></View>;
const SecondRoute = () => <View style={[ styles.container]}><BookedTrips/>
<BookedTrips/>
<BookedTrips/></View>;

export default class TripsScreen extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Trips(Booked)' },
      { key: 'second', title: 'Trips(Listed)' },
    ],
  };
 
  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} />;

   _renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this._renderScene}
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
    margin:7
  },
});