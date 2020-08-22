import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDJvPIbOL4FEZH1TjIG4-58VtTXAqD6Yy0",
    authDomain: "whatsapp-web-be89d.firebaseapp.com",
    databaseURL: "https://whatsapp-web-be89d.firebaseio.com",
    projectId: "whatsapp-web-be89d",
    storageBucket: "whatsapp-web-be89d.appspot.com",
    messagingSenderId: "407500859504",
    appId: "1:407500859504:web:6811e8af82054132c12cb5",
    measurementId: "G-96M1MLMFZ2"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)

  const db  = firebaseApp.firestore()
  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider()

export {auth,provider}
export default db;

