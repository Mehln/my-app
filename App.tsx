import { ScrollView, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert, Animated } from 'react-native';
import { useState } from 'react';
import ProductCard from './ProductCard';

export default function App() {

  const products = [
    { id: 1, name: 'Quantum Hoverboard X9000', price: '999.99', image: 'https://cdn.pixabay.com/photo/2023/12/23/08/42/island-8465139_1280.png' },
    { id: 2, name: 'Cybernetic Glasses Y12', price: '499.99', image: 'https://cdn.pixabay.com/photo/2023/06/22/06/53/beautiful-girl-8080757_960_720.jpg' },
    { id: 3, name: 'Neon Shoes VR Edition', price: '299.99', image: 'https://cdn.pixabay.com/photo/2024/02/20/05/16/hummingbird-8584603_1280.jpg' },
    { id: 4, name: 'Holographic Wristband', price: '199.99', image: 'https://cdn.pixabay.com/photo/2023/01/15/22/48/river-7721287_1280.jpg' },
  ];

  const handleSeeMore = () => {
    Alert.alert("Voir plus de produits", "Rediriger vers une page avec plus de produits ou charger davantage d'éléments.");
  };

  const [scaleValue] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 5,
      tension: 150,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView>
      <Text style={styles.title}>Les produits</Text>
      <ScrollView horizontal={true}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ScrollView>
      
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        onPress={handleSeeMore}
      >
        <View style={styles.seeMoreButton}>
          <Text style={styles.seeMoreText}>Voir plus de produits</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    marginLeft: 20,
    color: 'black', // Couleur du titre en blanc
  },
  seeMoreButton: {
    backgroundColor: '#121212', // Couleur de fond sombre
    padding: 15,
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(0, 255, 255, 0.5)', // Bordure cyan avec transparence
    shadowColor: '#00FFFF', // Ombre cyan
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 15,
  },
  seeMoreText: {
    color: '#00FFFF', // Couleur du texte en cyan néon
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1.5, // Espacement entre les lettres pour un style plus "tech"
    textTransform: 'uppercase', // Texte en majuscules
  },
});
