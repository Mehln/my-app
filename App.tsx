import React from 'react';
import useAuth from './src/hooks/useAuth';
import { Button, View, Text, StyleSheet } from 'react-native';
import SignIn from './src/screens/authentification/SignIn';
import { auth } from './src/config/firebase';
import { signOut } from 'firebase/auth';

import { useTheme, ThemeProvider } from '@context/ThemeContext';

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
      <SignIn />
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
