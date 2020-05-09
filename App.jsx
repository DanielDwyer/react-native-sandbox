/* eslint-disable react/prop-types */
/* eslint-disable global-require */
import * as React from 'react';
import {
  Platform, StatusBar, StyleSheet, View,
} from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';
// Imports: Redux Persist Persister
import { store, persistor } from './redux/store/store.js';

const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  const { skipLoadingScreen } = props;
  if (!isLoadingComplete && !skipLoadingScreen) {
    return null;
  }
  return (
  // Redux: Global Store
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
            <Stack.Navigator>
              <Stack.Screen name="Root" component={BottomTabNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
