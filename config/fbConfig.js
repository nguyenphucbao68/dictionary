import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
var firebaseConfig = {
  apiKey: 'AIzaSyAMX9qGATM-kNivHTU7Bjpdc82jglHncb8',
  authDomain: 'dictionary-website-c9657.firebaseapp.com',
  databaseURL: 'https://dictionary-website-c9657.firebaseio.com',
  projectId: 'dictionary-website-c9657',
  storageBucket: 'dictionary-website-c9657.appspot.com',
  messagingSenderId: '733720137608',
  appId: '1:733720137608:web:017330c4676900725af43d',
  measurementId: 'G-GFYLVRLETW',
};
// const firebaseConfig = {
//   apiKey: 'AIzaSyANkM_cD_v-p3LwaRyWx4ibraqiF2OW2kk',
//   authDomain: 'chatreset.firebaseapp.com',
//   databaseURL: 'https://chatreset.firebaseio.com',
//   projectId: 'chatreset',
//   storageBucket: 'chatreset.appspot.com',
//   messagingSenderId: '476222306218',
//   appId: '1:476222306218:web:f9f1e0643d6096f4339dd3',
// };
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// firebase.analytics();
// firebase.firestore().settings({ timestampsInSnapshots: true });
export default firebase;
