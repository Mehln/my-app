import React from 'react';
import { View, Text, Modal, Pressable } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './styles';

interface ForgetPasswordModalProps {
    visible: boolean;
    modalEmail: string;
    setModalEmail: (email: string) => void;
    emailModalError: string;
    handleForgotPassword: () => void;
    onClose: () => void;
}

const ForgetPasswordModal: React.FC<ForgetPasswordModalProps> = (
    { visible, modalEmail, setModalEmail, emailModalError, handleForgotPassword, onClose }
) => {
  return (
    <Modal animationType="slide" transparent visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.drawerModalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Mot de passe oublié</Text>
            <Pressable onPress={onClose}>
              <FontAwesomeIcon icon={faXmark} size={24} color="black" />
            </Pressable>
          </View>
          <Text style={styles.modalText}>Veuillez entrer votre adresse e-mail</Text>
          <Input
            placeholder="Email"
            value={modalEmail}
            onChangeText={setModalEmail}
            errorMessage={emailModalError}
            label="Email"
          />
          <Button title="Envoyer" onPress={() => handleForgotPassword()} buttonStyle={styles.authButton} />
        </View>
      </View>
    </Modal>
  );
};

export default ForgetPasswordModal;
