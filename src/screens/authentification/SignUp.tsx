import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import Toast from 'react-native-toast-message';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { auth } from '@config/firebase';
import GlobalStyles from '@styles/styles';
import { ERRORS } from '@constants/errors';
import MyActivityIndicator from '@components/MyActivityIndicator';
import SignUpForm from '@components/authentification/SignUpForm';

import styles from './styles';

interface SignUpProps {
  navigation: any;
}

const SignUp = ({ navigation }: SignUpProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (isSignUpFormValid()) {
      try {
        setLoading(true);
        await createUserWithEmailAndPassword(auth, email, password);
        navigation.navigate('SignIn');
      } catch (error) {
        showErrorToast(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const isSignUpFormValid = () => {
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
    } else if (password.length < 6) {
      setPasswordError(ERRORS.PASSWORD_TOO_SHORT);
      valid = false;
    } else {
      setPasswordError(ERRORS.PASSWORD_FORMAT);
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Les mots de passe ne correspondent pas.');
      valid = false;
    }

    return valid;
  };

  const showErrorToast = (error) => {
    Toast.show({
      type: 'error',
      text1: 'Erreur',
      text2: error.message,
      visibilityTime: 3000,
      position: 'top',
      topOffset: 150,
    });
  };

  const resetErrors = () => {
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
  };

  return (
    <View style={GlobalStyles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.title}>Golm'App</Text>
        <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.logo} />
      </View>

      <SignUpForm
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        emailError={emailError}
        passwordError={passwordError}
        confirmPasswordError={confirmPasswordError}
        setEmail={setEmail}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
        onSubmit={handleSignUp}
      />

      {loading && <MyActivityIndicator />}

      <View style={styles.bottomTextContainer}>
        <Text style={GlobalStyles.label}>
          Tu as déjà un compte ?{' '}
          <Text style={styles.textLink} onPress={() => navigation.navigate('SignIn')}>
          Connectes toi !</Text>
        </Text>
      </View>

      <Toast />
    </View>
  );
};

export default SignUp;
