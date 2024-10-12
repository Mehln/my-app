import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import Toast from 'react-native-toast-message';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

import { auth } from '@config/firebase';
import { DEV_EMAIL, DEV_PASSWORD } from '@env';
import GlobalStyles from '@styles/styles';
import { ERRORS } from '@constants/errors';
import MyActivityIndicator from '@components/MyActivityIndicator';
import SignInForm from '@components/authentification/SignInForm';
import ForgetPasswordModal from '@components/authentification/ForgetPasswordModal';

import styles from './styles';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalEmail, setModalEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailModalError, setEmailModalError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgetPasswordModal, setShowForgetPasswordModal] = useState(false);

  const handleSignIn = async () => {
    if (__DEV__ && email === '1') {
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
    } catch (error) {
      showErrorToast(error);
    } finally {
      setLoading(false);
    }
  };

  const isSignInFormValid = () => {
    resetErrors();
    let valid = true;
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

  const handleForgotPassword = async () => {

    if (!modalEmail) {
      setEmailModalError(ERRORS.EMAIL_EMPTY_ERROR);
    } else if (!/\S+@\S+\.\S+/.test(modalEmail)) {
      setEmailModalError(ERRORS.EMAIL_INVALID_ERROR);
    } else {
      await sendPasswordResetEmail(auth, modalEmail)
        .then(() => {
          resetErrors();
          resetForm();
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

  const showErrorToast = (error) => {
    if (error.code === 'auth/invalid-credential') {
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: 'Identifiants incorrects',
        visibilityTime: 3000,
        topOffset: 150,
      });
      setPasswordError('Mot de passe incorrect');
    }
  };

  const resetErrors = () => {
    setEmailError('');
    setPasswordError('');
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    resetErrors();
  };

  return (
    <View style={GlobalStyles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.title}>Golm'App</Text>
        <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.logo} />
      </View>
      
      <SignInForm
        email={email}
        password={password}
        emailError={emailError}
        passwordError={passwordError}
        setEmail={setEmail}
        setPassword={setPassword}
        onSubmit={handleSignIn}
        onForgotPassword={() => setShowForgetPasswordModal(true)}
      />
      
      {loading && <MyActivityIndicator />}
      
      <ForgetPasswordModal
        visible={showForgetPasswordModal}
        modalEmail={modalEmail}
        setModalEmail={setModalEmail}
        emailModalError={emailModalError}
        handleForgotPassword={handleForgotPassword}
        onClose={() => setShowForgetPasswordModal(false)}
      />

      <Toast />
    </View>
  );
};

export default SignIn;
