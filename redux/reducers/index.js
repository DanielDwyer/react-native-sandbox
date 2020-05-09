// Imports: Dependencies
import { combineReducers } from 'redux';
// Imports: Reducers
import authReducer from './authReducer';
import counterReducer from './counterReducer';
import geolocationReducer from './geolocationReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  authReducer: authReducer,
  counterReducer: counterReducer,
  geolocationReducer: geolocationReducer,
});
// Exports
export default rootReducer;