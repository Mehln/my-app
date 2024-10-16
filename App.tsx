import React from 'react';
import useAuth from '@hooks/useAuth';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ThemeProvider, useTheme } from '@context/ThemeContext';

import SignIn from '@screens/authentification/SignIn';
import SignUp from '@screens/authentification/SignUp';
import PageWithActionBar from '@screens/PageWithActionBar';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthenticatedTabs = () => {

  const { theme } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.actionBarBackground,
        },
      }}
    >
      <Tab.Screen name="Page 1" component={PageWithActionBar} />
      <Tab.Screen name="Home" component={PageWithActionBar} />
      <Tab.Screen name="Page 3" component={PageWithActionBar} />
    </Tab.Navigator>
  );
};

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="SignIn" 
      component={SignIn}
      options={{ headerShown: false }} 
    />
    <Stack.Screen
      name="SignUp"
      component={SignUp}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const App = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <AuthenticatedTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
