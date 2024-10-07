import React from 'react';
import useAuth from './src/hooks/useAuth';
import { Button } from 'react-native';
import SignIn from './src/screens/authentification/SignIn';
import { auth } from './src/config/firebase';
import { signOut } from 'firebase/auth';

const App = () => {
  
  const { user } = useAuth();

  const handleSignOut = () => {
    signOut(auth);
  }

  return (
    user ? (
      <>
        <Button title="Se déconnecter" onPress={handleSignOut} />
        <Button title="Se déconnecter" onPress={handleSignOut} />
        <Button title="Se déconnecter" onPress={handleSignOut} />
        <Button title="Se déconnecter" onPress={handleSignOut} />
      </>
    ) : (
      <SignIn />
    )
  );
}

export default App;
  