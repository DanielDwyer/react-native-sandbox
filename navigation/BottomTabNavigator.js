import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/tabs/HomeScreen';
import LinksScreen from '../screens/links/LinksScreen';
import SandBoxScreen from '../screens/tabs/SandboxScreen';
import CounterScreen from '../screens/tabs/CounterScreen';

// Tab Navigation Logic
const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';
function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  // navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Get Started',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
        }}
      />
      <BottomTab.Screen
        name="SandBox"
        component={SandBoxScreen}
        options={{
          title: 'Sand Box',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
        }}
      />
      <BottomTab.Screen
        name="Counter"
        component={CounterScreen}
        options={{
          title: 'Counter',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-map" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

const Stack = createStackNavigator();
// stack navigator options (utilizes tab navigator options)
export default function Navigation({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <Stack.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Home"
        component={BottomTabNavigator}
      />
      <Stack.Screen
        name="Links"
        component={LinksScreen}
        options={{
          title: "Resources",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-book" />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return '🏘️';
    case 'Links':
      return '🔗';
    case 'SandBox':
      return '🏖️';
    case 'Counter':
      return '🧮';
  }
}
