import Permissions from 'expo-permissions';

// Store if geolocation permission has been requested
const storeIsGeolocationPermissionRequested = (isRequested) => ({
  type: 'STORE_IS_GEOLOCATION_PERMISSION_REQUESTED',
  isRequested,
});

// Store geolocation permission status
const storeGeolocationPermissionStatus = (status) => ({
  type: 'STORE_GEOLOCATION_PERMISSION_STATUS',
  status,
});

// Store geolocation
const storeGeolocation = (geolocation) => ({
  type: 'STORE_GEOLOCATION',
  geolocation,
});

// Get geolocation
export const getGeolocation = () => (dispatch) => {
  // get and store geolocation
  navigator.geolocation.getCurrentPosition(
    (position) => {
      dispatch(storeGeolocation(position));
    },
    (error) => {
      // TODO Handle error
      console.log('error:', error);
    }, {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000,
    },
  );
};

// Check current geolocation permission status
export const getGeolocationPermissionStatus = () => async (dispatch) => {
  // permission options: 'authorized', 'denied', 'restricted', or 'undetermined'
  try {
    const permission = await Permissions.check('location');
    dispatch(storeGeolocationPermissionStatus(permission));
  } catch(error) {
    console.log('error:', error);
  }
  /**
    local: error.toString() === "TypeError: undefined is not an object (evaluating 'PermissionsIOS.getPermissionStatus')"
    expo: error.toString() === "TypeError: undefined is not an object (evaluating 'o.getPermissionStatus')"
   */
};

// Request geolocation permission
export const requestGeolocationPermission = () => async (dispatch) => {
  // response options: 'authorized', 'denied', 'restricted', or 'undetermined'
  const response = await Permissions.request('location');
  dispatch(storeIsGeolocationPermissionRequested(response));
  // NOTE: can see the same development error listed above, in getGeolocationPermissionStatus
};
