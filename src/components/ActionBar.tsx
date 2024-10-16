import React, { useEffect } from 'react';
import { View, Text, Animated, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '@context/ThemeContext';

interface ActionBarProps {
  scrollY: Animated.Value;
  useLargeHeader: boolean;
  largeHeaderImage: number;
  largeHeaderTitle: string;
  smallHeaderTitle: string;
  smallHeaderLeftComponent?: React.ReactNode;
  smallHeaderRightComponent?: React.ReactNode;
  largeHeaderTopLeftComponent?: React.ReactNode
  largeHeaderTopRightComponent?: React.ReactNode;
  onHeightChange?: (maxHeight: number) => void;
}

const ActionBar = ({
  scrollY,
  useLargeHeader,
  largeHeaderImage,
  largeHeaderTitle,
  smallHeaderTitle,
  smallHeaderLeftComponent,
  smallHeaderRightComponent,
  largeHeaderTopLeftComponent,
  largeHeaderTopRightComponent,
  onHeightChange,
}: ActionBarProps) => {

  const { theme } = useTheme();

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
    <Animated.View style={[styles.header, { height: headerHeight, backgroundColor: theme.actionBarBackground }]}>
      {useLargeHeader && (
        <>
          <Animated.Image
            source={largeHeaderImage}
            style={[styles.backgroundImage, { opacity: imageOpacity }]}
          />
          <Animated.Text
            style={[styles.largeHeaderTitle, { opacity: imageOpacity }]}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {largeHeaderTitle}
          </Animated.Text>
          {/* Ajout des composants gauche et droite pour le grand header */}
          <Animated.View style={[styles.largeHeaderLeftComponent, { opacity: imageOpacity }]}>
            {largeHeaderTopLeftComponent}
          </Animated.View>
          <Animated.View style={[styles.largeHeaderRightComponent, { opacity: imageOpacity }]}>
            {largeHeaderTopRightComponent}
          </Animated.View>
        </>
      )}

      <Animated.View style={[styles.smallHeader, useLargeHeader ? { opacity: smallHeaderOpacity } : {}]}>
        <View style={styles.leftComponent}>
          {smallHeaderLeftComponent}
        </View>
        <Text style={[styles.smallHeaderTitle, { color: theme.actionBarTextColor }]}>{smallHeaderTitle}</Text>
        <View style={styles.rightComponent}>
          {smallHeaderRightComponent}
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
    fontSize: 32,
    fontWeight: 'bold',
  },
  largeHeaderLeftComponent: {
    position: 'absolute',
    top: 70,
    left: 20,
  },
  largeHeaderRightComponent: {
    position: 'absolute',
    top: 70,
    right: 20,
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
    color: 'black',
  },
  leftComponent: {
    position: 'absolute',
    left: 20,
  },
  rightComponent: {
    position: 'absolute',
    right: 20,
  },
});

export default ActionBar;
