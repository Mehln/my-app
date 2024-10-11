import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements';
import styles from './styles';

interface SignInFormProps {
    email: string;
    password: string;
    emailError: string;
    passwordError: string;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    onSubmit: () => void;
    onForgotPassword: () => void;
    onFaceIDLogin: () => void;
}

const SignInForm: React.FC<SignInFormProps> = ({
  email, password, emailError, passwordError,
  setEmail, setPassword, onSubmit, onForgotPassword, onFaceIDLogin
}) => {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Connexion</Text>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        errorMessage={emailError}
        inputStyle={styles.input}
      />
      <Input
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        errorMessage={passwordError}
        inputStyle={styles.input}
      />
      <Text style={styles.forgotPassword} onPress={onForgotPassword}>
        Mot de passe oublié ?
      </Text>
      <Button title="Se connecter" onPress={onSubmit} buttonStyle={styles.authButton} />
      <TouchableOpacity onPress={onFaceIDLogin} style={styles.faceIDContainer}>
        <Text>Face ID</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInForm;
