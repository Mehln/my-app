import React from 'react';
import { View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import styles from './styles';
import GlobalStyles from '@styles/styles';

interface SignUpFormProps {
    email: string;
    password: string;
    confirmPassword: string;
    emailError: string;
    passwordError: string;
    confirmPasswordError: string;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setConfirmPassword: (password: string) => void;
    onSubmit: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  email, password, confirmPassword, emailError, passwordError, confirmPasswordError,
  setEmail, setPassword, setConfirmPassword, onSubmit
}) => {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Inscription</Text>
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
      <Input
        placeholder="Confirmer le mot de passe"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        errorMessage={confirmPasswordError}
        inputStyle={GlobalStyles.input}
        labelStyle={GlobalStyles.label}
      />

      <Button title="S'inscrire" onPress={onSubmit} buttonStyle={styles.authButton} />
    </View>
  );
};

export default SignUpForm;
