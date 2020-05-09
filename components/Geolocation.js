import React from 'react';
import {  AsyncStorage, View } from 'react-native';
import Permissions from 'expo-permissions';
import { connect } from "react-redux";

// Imports: Redux Actions
import { storeGeolocation } from '../redux/actions/geolocationActions';

class Geolocation extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount() {
    try {
      const coords = AsyncStorage.multiGet(['latitude', 'longitude']);
      //  check to see if lat and long are set
      if (coords) {
        //  yes, proceed
        this.props.navigation.navigate('Home');
      } else {
        //  no, check to see if device has authorized use of geolocation
        const isGeolocationUseAuthorized = await this.checkGeolocationAccessStatus();
        if (isGeolocationUseAuthorized === 1) {
          //  authorized
          this.retrieveGeolocation();
        } else if (isGeolocationUseAuthorized === 2) {
          //  development (seed with development data)
          await AsyncStorage.multiSet([['latitude', (40.79415879337772).toString()], ['longitude',(-73.96558961277928).toString()]]);
          storeGeolocation({ env: 'dev' });
          this.props.navigation.navigate('Home');
        } else {
          //  not authorized, request permission
          const isRequestGeolocationAccess =  await this.requestGeolocationAccess();
          if (isRequestGeolocationAccess) {
            this.retrieveGeolocation();
          } else {
            this.props.navigation.navigate('Counter');
          }
        }
      }
    } catch (error) {
      console.log('1. error:', error);
      this.props.navigation.navigate('Counter');
    }
  }

  //  retrieve latitude & longitude
  retrieveGeolocation = ()  => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          await AsyncStorage.multiSet([['latitude', (position.coords.latitude).toString()], ['longitude',(position.coords.longitude).toString()]]);
          storeGeolocation(position);
          this.props.navigation.navigate('Home');
        } catch (error) {
          console.log('2. error:', error);
          this.props.navigation.navigate('Counter');
        }
      },
      (error) =>
        this.handleGeolocationError(),
        this.props.navigation.navigate('Counter'),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  checkGeolocationAccessStatus = async () => {
    return new Promise(async (resolve, reject) => {
      //  options 'authorized', 'denied', 'restricted', or 'undetermined'
      //  expect locationPermissionQuery to equal authorized to proceed
      try {
        const locationPermissionQuery = await Permissions.check('location');
        if (locationPermissionQuery !== 'authorized') resolve(false);
        resolve(1);
      } catch (error) {
        //  local development testing
        if (error.toString() === "TypeError: undefined is not an object (evaluating 'PermissionsIOS.getPermissionStatus')"){
          resolve(2);
        } else if(error.toString() ===  "TypeError: undefined is not an object (evaluating 'o.getPermissionStatus')") {
          //  expo testing
          resolve(2);
        } else {
          //  cannot proceed without authorizing geolocation
          //  please exit and close app and restart to authorize
          reject(false);
        }
      }
    })
  }

  requestGeolocationAccess = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        //  request user authorize geolocation use to proceed
        const requestGeolocationAccess = await Permissions.request('location');
        //  expect requestGeolocationAccess to equal authorized to proceed
        //  options 'authorized', 'denied', 'restricted', or 'undetermined'
        if (requestGeolocationAccess !== 'authorized') {
          //  cannot proceed without authorizing geolocation
          //  please exit and close app and restart to authorize
          reject(false);
        }
        resolve(true);
      } catch (error) {
        if (error.toString() === "TypeError: undefined is not an object (evaluating 'PermissionsIOS.getPermissionStatus')") {
          //  local development testing
          resolve(true);
        } else if (error.toString() ===  "TypeError: undefined is not an object (evaluating 'o.getPermissionStatus')") {
          //  expo testing
          resolve(true);
        } else {
          //  cannot proceed without authorizing geolocation
          //  please exit and close app and restart to authorize
          reject(false);
        }
      }
    })
  }

  render() {
    return (
      <View />
    );
  }
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    geolocation: state.geolocationReducer.geolocation,
  };
};
// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    // Store geolocaction
    storeGeolocation: (geolocation) => dispatch(storeGeolocation(geolocation)),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Geolocation);