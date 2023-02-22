// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';
// import 'firebase/storage';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
	projectId: 'myntra-c3e27',
    appId: '1:873372781784:web:23bf433a0ae950b6a69bad',
    storageBucket: 'myntra-c3e27.appspot.com',
    apiKey: 'AIzaSyDNkoSGt9Ddc414ejJIAPBfdkd4-my1MXY',
    authDomain: 'myntra-c3e27.firebaseapp.com',
    messagingSenderId: '873372781784',
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
export {auth, db, storage};
