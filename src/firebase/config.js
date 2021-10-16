import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDnPZb5PmE9ptInQI-JL6PwE4Jcb1SWQ_8",
  authDomain: "react-backend-fac3f.firebaseapp.com",
  databaseURL: "https://react-backend-fac3f-default-rtdb.firebaseio.com",
  projectId: "react-backend-fac3f",
  storageBucket: "react-backend-fac3f.appspot.com",
  messagingSenderId: "457442611434",
  appId: "1:457442611434:web:67d0d2b9ec4d0876088793"
};
firebase.initializeApp(firebaseConfig);
var Projectstorage=firebase.storage();
var Projectfirestore=firebase.firestore();
var timestamp=firebase.firestore.FieldValue.serverTimestamp;
export {Projectstorage,Projectfirestore,timestamp};