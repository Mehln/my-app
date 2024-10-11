import React, { useState } from 'react';
import { View, StyleSheet, Image, Alert, TouchableOpacity, Text, Modal, Pressable } from 'react-native';

import { MyActivityIndicator } from '../../components/MyActivityIndicator';

import GlobalStyles from '../../styles/styles';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';

import Toast from 'react-native-toast-message';

import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { Input, Button } from 'react-native-elements';
import { DEV_EMAIL, DEV_PASSWORD } from '@env';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modalEmail, setModalEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailModalError, setEmailModalError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showForgetPasswordModal, setShowForgetPasswordModal] = useState(false);

    const ERRORS = {
        EMAIL_EMPTY_ERROR: 'Veuillez entrer votre adresse e-mail',
        EMAIL_INVALID_ERROR: 'Veuillez entrer une adresse e-mail valide',
        PASSWORD_EMPTY_ERROR: 'Veuillez entrer votre mot de passe',
    };

    const isSignInFormValid = () => {
        let valid = true;
        resetErrors();

        if (!email) {
            setEmailError(ERRORS.EMAIL_EMPTY_ERROR);
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError(ERRORS.EMAIL_INVALID_ERROR);
            valid = false;
        }

        if (!password) {
            setPasswordError(ERRORS.PASSWORD_EMPTY_ERROR);
            valid = false;
        }

        return valid;
    };

    const handleSignIn = async () => {
      if (__DEV__ && email === '1') {
          setEmail(DEV_EMAIL);
          setPassword(DEV_PASSWORD);
          await handleSignInWithCredentials(DEV_EMAIL, DEV_PASSWORD);
          return;
      }
  
      if (isSignInFormValid()) {
          await handleSignInWithCredentials(email, password);
      }
  };
  
  const handleSignInWithCredentials = async (email: string, password: string) => {
      try {
          setLoading(true);
          await signInWithEmailAndPassword(auth, email, password);
          setTimeout(() => {
              setLoading(false);
              resetForm();
          }, 3000);
      } catch (error: any) {
          if (error.code === 'auth/invalid-credential') {
              console.log('error', error.code);
              Toast.show({
                  type: 'error',
                  text1: 'Erreur',
                  text2: 'Identifiants incorrects',
                  visibilityTime: 3000,
                  position: 'top',
                  topOffset: 150,
              });
              setPasswordError('Mot de passe incorrect');
          }
          setLoading(false);
      }
  };
  

    const handleFaceIDLogin = () => {
        // TODO: Face ID login
        console.log('Se connecter avec Face ID');
        Alert.alert('Se connecter avec Face ID', "Cette fonctionnalité n'est pas encore disponible");
    };

    const resetErrors = () => {
        setEmailError('');
        setPasswordError('');
    }

    const resetForm = () => {
        setEmail('');
        setPassword('');
        resetErrors();
    }

    const resetModalErrors = () => {
        setEmailModalError('');
    }

    const resetModalForm = () => {
        setModalEmail('');
        resetModalErrors();
    }

    const handleForgotPassword = async () => {

      if (!modalEmail) {
        setEmailModalError(ERRORS.EMAIL_EMPTY_ERROR);
        return;
      } else if (!/\S+@\S+\.\S+/.test(modalEmail)) {
        setEmailModalError(ERRORS.EMAIL_INVALID_ERROR);
        return;
      } else {
        await sendPasswordResetEmail(auth, modalEmail)
          .then(() => {
            setEmail('');
            setModalEmail('');
            setPassword('');
            setEmailError('');
            setPasswordError('');
            setModalEmail('');
            setEmailModalError('');
            setShowForgetPasswordModal(false);
            Toast.show({
              type: 'success',
              text1: 'Succès',
              text2: 'Un e-mail de réinitialisation de mot de passe a été envoyé',
              visibilityTime: 3000,
              position: 'top',
              topOffset: 150,
            });
          })
          .catch((error) => {
            console.log('error', error);
          });
      }
    };

    const handleCloseModal = () => {
        setShowForgetPasswordModal(false);
        resetModalForm();
    };

    const handleCreateAccount = () => {
        // TODO: Create account
        console.log('Créer un compte');
        Alert.alert('Créer un compte', "Cette fonctionnalité n'est pas encore disponible");
    }

  return (
    <View style={GlobalStyles.container}>

      <View style={styles.logoContainer}>
        <Text style={styles.title}>
          Golm'App
        </Text>
        {/* TODO: change logo */}
        <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.logo} />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Connexion</Text>
        <Input
          placeholder="Email"
          placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
          label="Email"
          labelStyle={GlobalStyles.label}
          inputStyle={GlobalStyles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          errorMessage={emailError}
          errorStyle={styles.errorText}
        />
        <Input
          placeholder="Mot de passe"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          label="Mot de passe"
          labelStyle={GlobalStyles.label}
          inputStyle={GlobalStyles.input}
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          errorMessage={passwordError}
          errorStyle={styles.errorText}
        />

        <Text style={styles.forgotPassword} onPress={() => setShowForgetPasswordModal(true)}>
          Mot de passe oublié ?
        </Text>

        <Button
          title="Se connecter"
          onPress={handleSignIn}
          buttonStyle={styles.authButton}
          disabled={loading}
        />

        <View style={styles.faceIDContainer}>
          <TouchableOpacity onPress={handleFaceIDLogin}>
            <Image source={require('../../../assets/face_id_logo.png')} style={styles.faceIDLogo} />
          </TouchableOpacity>
        </View>

        <Text style={styles.toggleText} onPress={() => handleCreateAccount()}>
          Pas de compte ? Créer un compte
        </Text>
      </View>

      {loading && <MyActivityIndicator />}

      <Modal
        animationType="slide"
        transparent={true}
        visible={showForgetPasswordModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.drawerModalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Mot de passe oublié</Text>
              <Pressable onPress={() => handleCloseModal()}>
                <FontAwesomeIcon icon={faXmark} size={24} color="black" />
              </Pressable>
            </View>
            <Text style={styles.modalText}>Veuillez entrer votre adresse e-mail</Text>
            <Input
              placeholder="Email"
              placeholderTextColor="rgba(0, 0, 0, 0.5)"
              label="Email"
              labelStyle={{ color: 'black' }}
              autoCapitalize="none"
              value={modalEmail}
              errorMessage={emailModalError}
              errorStyle={styles.errorText}
              onChangeText={(text) => setModalEmail(text)}
            />
            <Button
              title="Envoyer"
              onPress={() => handleForgotPassword()}
              buttonStyle={styles.authButton}
            />
          </View>
        </View>
      </Modal>

      <Toast />

    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    letterSpacing: 2,
  },
  formTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  authButton: {
    marginVertical: 30,
    borderRadius: 30,
    backgroundColor: '#9B47FA',
    paddingVertical: 12,
  },
  toggleText: {
    textAlign: 'center',
    color: 'white',
    marginTop: 10,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  errorText: {
    textAlign: 'right',
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    marginBottom: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  formContainer: {
    marginTop: 20,
    padding: 20,
  },
  forgotPassword: {
    color: '#9B47FA',
    textDecorationLine: 'underline',
    fontSize: 14,
    marginLeft: 10,
  },
  faceIDContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  faceIDLogo: {
    width: 60,
    height: 60,
  },

  // MODAL
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',  // Positionne la modal au bas
    alignItems: 'center',
  },
  drawerModalView: {
    width: '100%',                // Occupe toute la largeur
    height: '35%',                // Prend la moitié de la
    backgroundColor: 'white',
    borderTopLeftRadius: 20,       // Bords arrondis en haut
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',          // Affiche l'icône et le titre côte à côte
    justifyContent: 'space-between', // Espace entre le titre et l'icône
    alignItems: 'center',          // Centre verticalement les éléments
    marginBottom: 30,              // Espace en dessous du titre
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    color: '#9B47FA',
  },
  modalTitle : {
    fontSize: 20,
    fontWeight: '600',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
});

export default SignIn;