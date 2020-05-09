// Imports: Dependencies
import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

// Imports: Redux
import rootReducer from '../reducers/index';

// Middleware: Redux Persist Config
const persistConfig = {
  // Root
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: [
    'authReducer',
  ],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: [
    'counterReducer',
  ],
};
// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
// Redux: Store
const store = createStore(
  persistedReducer,
  applyMiddleware(
    createLogger(),
    thunk,
  ),
);
// Middleware: Redux Persist Persister
const persistor = persistStore(store);
// Exports
export {
  store,
  persistor,
};
