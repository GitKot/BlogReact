import firebase from 'firebase'

 export const appName = "form-project-d8b43"

 export const firebaseConfig = {
    apiKey: "AIzaSyDkg3W3A-Wv11KjZz0RN7Opr4n_Fxzxiro",
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: `${appName}.appspot.com`,
    messagingSenderId: "544849147159"
  }

  firebase.initializeApp(firebaseConfig)