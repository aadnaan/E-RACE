import firebase from 'firebase';
import 'firebase/firestore';
import '@firebase/database';
const Config={
    apiKey: "AIzaSyCbPyme_Fw8kRC2XhylIvIJbay8i51vews",
    authDomain: "erace-fac4e.firebaseapp.com",
    databaseURL: "https://erace-fac4e.firebaseio.com",
    projectId: "erace-fac4e",
    storageBucket: "erace-fac4e.appspot.com",
    messagingSenderId: "71520141996",
};

firebase.initializeApp(Config);
export const f=firebase;
export const database=firebase.database();
export const auth=firebase.auth();
export const storage=firebase.storage();
export const firestore=firebase.firestore();