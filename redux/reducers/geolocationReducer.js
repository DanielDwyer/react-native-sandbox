
// Initial State
const initialState = {
  isGeolocationPermissionRequested: false,
  geolocationPermissionStatus: null,
  geolocation: {},
};

// Reducers (Modifies The State And Returns A New State)
const geolocationReducer = (state = initialState, action) => {
  switch (action.type) {
    // Store if geolocation permission has been requested
    case 'STORE_IS_GEOLOCATION_PERMISSION_REQUESTED': {
      return {
        // State
        ...state,
        // Redux Store
        isGeolocationPermissionRequested: action.isGeolocationPermissionRequested,
      }
    }
    // Store geolocation permission status
    case 'STORE_GEOLOCATION_PERMISSION_STATUS': {
      return {
        // State
        ...state,
        // Redux Store
        geolocationPermissionStatus: action.geolocationPermissionStatus,
      }
    }
    // Store geolocation
    case 'STORE_GEOLOCATION': {
      return {
        // State
        ...state,
        // Redux Store
        geolocation: action.geolocation, 
      }
    }
    // Default
    default: {
      return state;
    }
  }
};
// Exports
export default geolocationReducer;