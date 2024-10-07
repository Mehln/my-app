import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Image, Alert, TouchableOpacity, Text } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { Input, Button } from 'react-native-elements';
import { DEV_EMAIL, DEV_PASSWORD } from '@env';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false);

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

    const handleForgotPassword = async () => {
        // TODO: Forgot password
        console.log('Mot de passe oublié');
        Alert.alert('Mot de passe oublié', "Cette fonctionnalité n'est pas encore disponible");
    };

    const handleCreateAccount = () => {
        // TODO: Create account
        console.log('Créer un compte');
        Alert.alert('Créer un compte', "Cette fonctionnalité n'est pas encore disponible");
    }

  return (
    <View style={styles.container}>

      <View style={styles.logoContainer}>
        <Text h1 style={styles.title}>
          Golm'App
        </Text>
        {/* TODO: change logo */}
        <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.logo} />
      </View>

      <View style={styles.formContainer}>
        <Text h3 style={styles.formTitle}>Connexion</Text>
        <Input
          placeholder="Email"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          label="Email"
          labelStyle={{ color: 'white' }}
          inputStyle={styles.input}
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
          labelStyle={{ color: 'white' }}
          secureTextEntry
          inputStyle={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          errorMessage={passwordError}
          errorStyle={styles.errorText}
        />

        <Text style={styles.forgotPassword} onPress={() => handleForgotPassword()}>
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

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#9B47FA" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F',
  },
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
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
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
  input: {
    color: 'white',
    fontSize: 16,
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
});

export default SignIn;