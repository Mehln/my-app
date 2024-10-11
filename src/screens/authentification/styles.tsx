import { StyleSheet } from 'react-native';

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

export default styles;
