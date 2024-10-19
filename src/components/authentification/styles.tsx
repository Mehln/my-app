import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    title: {
      color: 'white',
      fontSize: width * 0.09, // Taille responsive en fonction de la largeur de l'écran
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
      letterSpacing: 2,
    },
    formTitle: {
      color: 'white',
      fontSize: width * 0.06, // Taille responsive
      fontWeight: '600',
      textAlign: 'center',
    },
    authButton: {
      marginVertical: 30,
      borderRadius: 30,
      backgroundColor: '#9B47FA',
      paddingVertical: 12,
    },
    authButtonLabel: {
      fontSize: width * 0.04, // Taille responsive
    },
    toggleText: {
      textAlign: 'center',
      color: 'white',
      marginTop: 10,
      fontSize: width * 0.035, // Taille responsive
      textDecorationLine: 'underline',
    },
    errorText: {
      textAlign: 'right',
      color: 'red',
      fontSize: width * 0.03, // Taille responsive
      marginTop: 5,
      marginBottom: 10,
    },
    logoContainer: {
      alignItems: 'center',
      height: '25%', // 25% de la hauteur de l'écran
    },
    formContainer: {
      flex: 0.5,
      justifyContent: 'flex-start',
      paddingHorizontal: '5%',
    },
    forgotPassword: {
      color: '#9B47FA',
      textDecorationLine: 'underline',
      fontSize: width * 0.04, // Taille responsive
      marginLeft: 10,
    },
    bottomTextContainer: {
      height: '5%', // Reste partagé
      textAlign: 'center',
      alignSelf: 'center',
    },
  
    // MODAL
    centeredView: {
      flex: 1,
      justifyContent: 'flex-end',  // Positionne la modal au bas
      alignItems: 'center',
    },
    drawerModalView: {
      width: '100%',
      height: '35%',
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 30,
    },
    modalText: {
      marginBottom: 15,
      fontSize: width * 0.045, // Taille responsive
      fontWeight: '400',
      textAlign: 'center',
      color: '#9B47FA',
    },
    modalTitle : {
      fontSize: width * 0.05, // Taille responsive
      fontWeight: '600',
    },
    button: {
      borderRadius: 10,
      padding: 10,
      elevation: 2,
    },
});

export default styles;
