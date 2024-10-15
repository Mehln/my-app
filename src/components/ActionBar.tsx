import React, { useEffect } from 'react';
import { View, Text, Animated, StyleSheet, Image, Dimensions } from 'react-native';

interface ActionBarProps {
  scrollY: Animated.Value;
  useLargeHeader: boolean; // Booléen pour indiquer si on utilise le grand header
  largeHeaderImage: string; // Image pour le grand header
  largeHeaderTitle: string; // Titre pour le grand header
  smallHeaderTitle: string; // Titre pour le petit header
  leftComponent?: React.ReactNode; // Composant pour la partie gauche du petit header
  rightComponent?: React.ReactNode; // Optionnel : composant pour la partie droite du petit header
  onHeightChange?: (maxHeight: number) => void; // Optionnel : si tu veux passer cette hauteur à la page
}

const ActionBar = ({
  scrollY,
  useLargeHeader,
  largeHeaderImage,
  largeHeaderTitle,
  smallHeaderTitle,
  leftComponent,
  rightComponent,
  onHeightChange,
}: ActionBarProps) => {
  const screenHeight = Dimensions.get('window').height;

  const maxHeaderHeight = useLargeHeader ? screenHeight * 0.3 : screenHeight * 0.1;
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

  // Interpolation pour l'opacité de l'image et du premier texte (grand header)
  const imageOpacity = scrollY.interpolate({
    inputRange: [0, maxHeaderHeight / 2],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  // Interpolation pour l'opacité du second texte (petit header)
  const smallHeaderOpacity = scrollY.interpolate({
    inputRange: [maxHeaderHeight / 2, maxHeaderHeight],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={[styles.header, { height: headerHeight }]}>
      {useLargeHeader && (
        <>
          <Animated.Image
            source={{ uri: largeHeaderImage }}
            style={[styles.backgroundImage, { opacity: imageOpacity }]}
          />
          <Animated.Text
            style={[styles.largeHeaderTitle, { opacity: imageOpacity }]}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {largeHeaderTitle}
          </Animated.Text>
        </>
      )}

      <Animated.View style={[styles.smallHeader, useLargeHeader ? { opacity: smallHeaderOpacity } : {}]}>
        <View style={styles.leftComponent}>
          {leftComponent}
        </View>
        <Text style={styles.smallHeaderTitle}>{smallHeaderTitle}</Text>
        <View style={styles.rightComponent}>
          {rightComponent}
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'orange',
    zIndex: 1000,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  largeHeaderTitle: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  smallHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 10,
    paddingHorizontal: 10,
  },
  smallHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  leftComponent: {
    position: 'absolute',
    left: 10,
  },
  rightComponent: {
    position: 'absolute',
    right: 10,
  },
});

export default ActionBar;
