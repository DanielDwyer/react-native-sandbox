import * as Permissions from "expo-permissions";

// Store geolocation permission status
const storeGeolocationPermissionStatus = (geolocationPermissionStatus) => ({
  type: "STORE_GEOLOCATION_PERMISSION_STATUS",
  geolocationPermissionStatus,
});

// Store if geolocation permission has been requested
const storeIsGeolocationPermissionRequested = (isGeolocationPermissionRequested) => ({
  type: 'STORE_IS_GEOLOCATION_PERMISSION_REQUESTED',
  isGeolocationPermissionRequested,
});

// Store geolocation
const storeGeolocation = (geolocation) => ({
  type: 'STORE_GEOLOCATION',
  geolocation,
});

// Check current geolocation permission status
export const getGeolocationPermissionStatus = () => async (dispatch) => {
  try {
    // status options: granted or denied
    const { status } = await Permissions.getAsync(Permissions.LOCATION);
    dispatch(storeGeolocationPermissionStatus(status));
  } catch(error) {
    // TODO Handle error
    console.log('error:', error);
  }
};

// Request geolocation permission
export const requestGeolocationPermission = () => async (dispatch) => {
  try {
    // status options: granted or denied
    const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
    dispatch(storeIsGeolocationPermissionRequested(status));
  } catch (error) {
    // TODO Handle error
    console.log('error:', error);
  }
};

// Get geolocation
export const getGeolocation = () => (dispatch) => {
  try {
    const position = Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    dispatch(storeGeolocation(position));
  } catch (error) {
    // TODO Handle error
    console.log('error:', error);
  }
};
