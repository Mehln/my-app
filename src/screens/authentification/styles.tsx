import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: width * 0.1,
    fontWeight: 'bold',
    marginBottom: '5%',
    textAlign: 'center',
    letterSpacing: 2,
  },
  logoContainer: {
    flex: 0.4,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  logo: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: width * 0.25,
  },
  formContainer: {
    marginTop: 20,
    padding: width * 0.05, // Padding scales based on screen size
  },
  forgotPassword: {
    color: '#9B47FA',
    textDecorationLine: 'underline',
    fontSize: width * 0.04, // Adjust text size
    marginLeft: 10,
  },
  faceIDContainer: {
    alignItems: 'center',
    marginVertical: height * 0.03,
  },
  faceIDLogo: {
    width: width * 0.15, // Adjust icon size
    height: width * 0.15,
  },
  textLink: {
    color: '#9B47FA',
    textDecorationLine: 'underline',
    fontSize: width * 0.04, // Adjust based on screen size
    marginLeft: 10,
  },
  bottomTextContainer: {
    textAlign: 'center',
    alignSelf: 'center',
    flex: 0.1,
    justifyContent: 'flex-start',
  },

  // MODAL
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',  // Position modal at the bottom
    alignItems: 'center',
  },
  drawerModalView: {
    width: '100%', // Full width
    height: height * 0.35, // Responsive modal height
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: width * 0.05, // Dynamic padding
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.04,
  },
  modalText: {
    marginBottom: 15,
    fontSize: width * 0.045, // Adjust text size
    fontWeight: '400',
    textAlign: 'center',
    color: '#9B47FA',
  },
  modalTitle: {
    fontSize: width * 0.05, // Adjust modal title size
    fontWeight: '600',
  },
  button: {
    borderRadius: 10,
    padding: height * 0.015,
    elevation: 2,
  },
});

export default styles;
