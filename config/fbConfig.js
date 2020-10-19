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
	measurementId: 'G-GFYLVRLETW'
};
// Initialize Firebase
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}
// firebase.analytics();
// firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
