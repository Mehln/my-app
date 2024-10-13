import React, { useEffect } from 'react';
import { View, Text, Animated, StyleSheet, Image, Dimensions } from 'react-native';

interface ActionBarProps {
  scrollY: Animated.Value;
  backgroundImage: string;
  text1: string;
  text2: string;
  onHeightChange?: (maxHeight: number) => void; // Optionnel : si tu veux passer cette hauteur à la page
}

const ActionBar = ({ scrollY, backgroundImage, text1, text2, onHeightChange }: ActionBarProps) => {
  const screenHeight = Dimensions.get('window').height;

  const maxHeaderHeight = screenHeight * 0.3;
  const minHeaderHeight = screenHeight * 0.1;

  useEffect(() => {
    if (onHeightChange) {
      onHeightChange(maxHeaderHeight);
    }
  }, [maxHeaderHeight, onHeightChange]);

  // Interpolation pour la hauteur de l'ActionBar
  const headerHeight = scrollY.interpolate({
    inputRange: [0, maxHeaderHeight],
    outputRange: [maxHeaderHeight, minHeaderHeight],
    extrapolate: 'clamp',
  });

  // Interpolation pour l'opacité de l'image et du premier texte (text1)
  const imageOpacity = scrollY.interpolate({
    inputRange: [0, maxHeaderHeight / 2],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  // Interpolation pour l'opacité du second texte (text2)
  const titleOpacity = scrollY.interpolate({
    inputRange: [maxHeaderHeight / 2, maxHeaderHeight],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={[styles.header, { height: headerHeight }]}>
      {/* Image de fond animée */}
      <Animated.Image
        source={{ uri: backgroundImage }}
        style={[styles.backgroundImage, { opacity: imageOpacity }]}
      />
      {/* Premier texte (text1) */}
      <Animated.Text style={[styles.headerText, { opacity: imageOpacity }]}>
        {text1}
      </Animated.Text>
      {/* Second texte (text2) qui apparaît au scroll */}
      <Animated.Text style={[styles.headerText, styles.text2, { opacity: titleOpacity }]}>
        {text2}
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    position: 'absolute',  // Permet de superposer les textes
  },
  text2: {
    bottom: 10,  // Positionner text2 en bas de l'ActionBar
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',  // Image en fond
  },
});

export default ActionBar;
