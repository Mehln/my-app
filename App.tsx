import React from 'react';
import useAuth from './src/hooks/useAuth';
import { Button, View, Text, StyleSheet } from 'react-native';
import SignIn from './src/screens/authentification/SignIn';
import SignUp from './src/screens/authentification/SignUp';
import { auth } from './src/config/firebase';
import { signOut } from 'firebase/auth';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useTheme, ThemeProvider } from '@context/ThemeContext';

const Stack = createStackNavigator();

const App = () => {
  const { user } = useAuth();
  const { theme, toggleTheme, isDarkMode } = useTheme();

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    user ? (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.text, { color: theme.text }]}>Bienvenue dans le mode {isDarkMode ? 'Sombre' : 'Clair'}!</Text>
        <Button
          title="Changer de mode"
          onPress={toggleTheme}
          color={theme.buttonBackground}
        />
        <Button title="Se déconnecter" onPress={handleSignOut} />
      </View>
    ) : (
      <NavigationContainer>
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
      </NavigationContainer>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});

// Place the ThemeProvider here
export default () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
