import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, Animated, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import ActionBar from '@components/ActionBar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft, faInfo, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '@context/ThemeContext';
import { Button } from 'react-native-elements';
import { signOut } from 'firebase/auth';
import { auth } from '@config/firebase';

import { LayoutAnimation } from 'react-native';

const PageWithActionBar = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const { theme, toggleTheme, isDarkMode } = useTheme();
  const [actionBarHeight, setActionBarHeight] = useState(0);
  const [showModal, setShowModal] = useState(false);  // État pour la modal
  const [modalMessage, setModalMessage] = useState('');

  const largeHeaderImage: number = require('@assets/backgrounds/billetterie.jpg');

  const handleSignOut = () => {
    signOut(auth);
  };

  const handleTestButton = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);  // Animation lors du changement de contenu
    setModalMessage('Action effectuée');
  };

  const SmallHeaderLeftComponent = () => (
    <TouchableOpacity onPress={() => console.log('Coucou')}>
      <FontAwesomeIcon icon={faAngleLeft} size={24} style={{ color: theme.actionBarTextColor }} />
    </TouchableOpacity>
  );

  const SmallHeaderRightComponent = () => (
    <TouchableOpacity onPress={() => console.log('Coucou2')}>
      <FontAwesomeIcon icon={faInfo} size={24} style={{ color: theme.actionBarTextColor }} />
    </TouchableOpacity>
  );

  const LargeHeaderTopLeftComponent = () => (
    <TouchableOpacity onPress={() => console.log('CoucouBIG')}>
      <FontAwesomeIcon icon={faAngleLeft} size={24} color="white" />
    </TouchableOpacity>
  );

  const LargeHeaderTopRightComponent = () => (
    <TouchableOpacity onPress={() => console.log('Coucou2BIG')}>
      <FontAwesomeIcon icon={faInfo} size={24} color="white" />
    </TouchableOpacity>
  );

  const handleCloseModal = () => {
    setShowModal(false);
    setModalMessage('');
    console.log('Modal fermée');
  }

  return (
    <View style={styles.container}>
      <ActionBar
        scrollY={scrollY}
        useLargeHeader={true}
        largeHeaderImage={largeHeaderImage}
        largeHeaderTitle="Billetterie"
        smallHeaderTitle="Billetterie"
        smallHeaderLeftComponent={<SmallHeaderLeftComponent />}
        smallHeaderRightComponent={<SmallHeaderRightComponent />}
        onHeightChange={(height) => setActionBarHeight(height)}
        largeHeaderTopLeftComponent={<LargeHeaderTopLeftComponent />}
        largeHeaderTopRightComponent={<LargeHeaderTopRightComponent />}
      />

      <ScrollView
        contentContainerStyle={[styles.scrollViewContent, { paddingTop: actionBarHeight, backgroundColor: theme.background }]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.content}>
          <Button title="Se déconnecter" onPress={handleSignOut} buttonStyle={{ backgroundColor: theme.buttonBackground }} />
          <Button title="Changer de thème" onPress={toggleTheme} buttonStyle={{ backgroundColor: theme.buttonBackground }} />
          <Button title="Ouvrir Modal" onPress={() => setShowModal(true)} buttonStyle={{ backgroundColor: theme.buttonBackground }} />
          <Text style={{ color: theme.text }}>Thème actuel : {isDarkMode ? 'Sombre' : 'Clair'}</Text>
          <Text style={{ color: theme.text }}>Voici du contenu sous la barre d'action</Text>
          {[...Array(50).keys()].map((_, index) => (
            <Text key={index} style={[styles.item, { color: theme.text }]}>Item {index + 1}</Text>
          ))}

          <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
            onRequestClose={() => setShowModal(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>

                {/* Bouton croix pour fermer */}
                <TouchableOpacity onPress={() => handleCloseModal()} style={styles.closeButton}>
                  <FontAwesomeIcon icon={faTimes} size={24} color="black" />
                </TouchableOpacity>

                {modalMessage ? (
                  <>
                    <Text style={styles.modalTitle}>Action terminée</Text>
                    <Text style={styles.modalMessage}>{modalMessage}</Text>
                  </>
                ) : (
                  <ScrollView>
                    <Button title="TEST" onPress={handleTestButton} buttonStyle={{ backgroundColor: theme.buttonBackground }} />
                    <Text style={styles.modalTitle}>Titre de la modal</Text>
                    <Text style={styles.modalText}>Contenu de la modal</Text>
                    <Text style={styles.modalText}>Contenu de la modal</Text>
                    <Text style={styles.modalText}>Contenu de la modal</Text>
                    <Text style={styles.modalText}>Contenu de la modal</Text>
                    <Text style={styles.modalText}>Contenu de la modal</Text>
                  </ScrollView>
                )}
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {},
  content: {
    padding: 16,
  },
  item: {
    marginVertical: 10,
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1000,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalMessage: {
    marginTop: 20,
    fontSize: 16,
    color: 'green',
  },
});

export default PageWithActionBar;
