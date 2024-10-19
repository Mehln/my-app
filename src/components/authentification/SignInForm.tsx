import React from 'react';
import { View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import styles from './styles';
import GlobalStyles from '@styles/styles';

interface SignInFormProps {
    email: string;
    password: string;
    emailError: string;
    passwordError: string;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    onSubmit: () => void;
    onForgotPassword: () => void;
}

const SignInForm: React.FC<SignInFormProps> = ({
  email, password, emailError, passwordError,
  setEmail, setPassword, onSubmit, onForgotPassword
}) => {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Connexion</Text>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        errorMessage={emailError}
        inputStyle={GlobalStyles.input}
        labelStyle={GlobalStyles.label}
      />
      <Input
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        errorMessage={passwordError}
        inputStyle={GlobalStyles.input}
        labelStyle={GlobalStyles.label}
      />
      <Text style={styles.forgotPassword} onPress={onForgotPassword}>
        Mot de passe oublié ?
      </Text>
      <Button title="Se connecter" onPress={onSubmit} buttonStyle={styles.authButton} titleStyle={styles.authButtonLabel} />
    </View>
  );
};

export default SignInForm;
