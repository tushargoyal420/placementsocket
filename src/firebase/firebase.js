import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database'

//firebase connection with application
const firebaseConfig = {
    apiKey: "AIzaSyCOvSZJCmjHfYawd7Efi05h59wgKhFQ1v4",
    authDomain: "placementsocket-5d51c.firebaseapp.com",
    databaseURL: "https://placementsocket-5d51c-default-rtdb.firebaseio.com",
    projectId: "placementsocket-5d51c",
    storageBucket: "placementsocket-5d51c.appspot.com",
    messagingSenderId: "441716792601",
    appId: "1:441716792601:web:e09ad45c71c0a5e1697988",
    measurementId: "G-E5V74G9WTW"
  };
	
firebase.initializeApp(firebaseConfig);
export default firebase;