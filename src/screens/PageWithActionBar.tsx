import React, { useRef, useState } from 'react';
import { View, Text, ScrollView, Animated, StyleSheet } from 'react-native';
import ActionBar from '@components/ActionBar';

import useAuth from '../hooks/useAuth';
import { auth } from '@config/firebase';
import { useTheme } from '@context/ThemeContext';
import { signOut } from 'firebase/auth';
import { Button } from 'react-native-elements';

const PageWithActionBar = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const { user } = useAuth();
  const { theme, toggleTheme, isDarkMode } = useTheme();

  const [actionBarHeight, setActionBarHeight] = useState(0);  // Stocker la hauteur

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <View style={styles.container}>
      <ActionBar 
        scrollY={scrollY}
        backgroundImage="https://images.pexels.com/photos/27163466/pexels-photo-27163466/free-photo-of-femme-main-sombre-ombre.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load" 
        text1={user ? `Bonjour, ${user?.email}` : 'Bonjour'}
        text2="Bonsoir"
        onHeightChange={(height) => setActionBarHeight(height)}  // On récupère la hauteur de l'ActionBar
      />

      {/* Contenu de la page */}
      <ScrollView
        contentContainerStyle={[styles.scrollViewContent, { paddingTop: actionBarHeight, backgroundColor: theme.background }]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }  // Gérer l'animation du scroll
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.content}>
          <Button title="Se déconnecter" onPress={handleSignOut} />
          <Button title="Changer de thème" onPress={toggleTheme} />
          <Text>Thème actuel : {isDarkMode ? 'Sombre' : 'Clair'}</Text>
          <Text>Voici du contenu sous la barre d'action</Text>
          {[...Array(50).keys()].map((_, index) => (
            <Text key={index} style={styles.item}>Item {index + 1}</Text>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    // paddingTop défini dynamiquement par actionBarHeight
  },
  content: {
    padding: 16,
  },
  item: {
    marginVertical: 10,
    fontSize: 18,
  },
});

export default PageWithActionBar;
