import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// Import seed file
// import { seedDatabase } from '../seed';

const config = {
  apiKey: 'AIzaSyBixS1hx39KGOqgz2RGAChrl62Yj4BCY5k',
  authDomain: 'flippingfoto-c86bb.firebaseapp.com',
  projectId: 'flippingfoto-c86bb',
  storageBucket: 'flippingfoto-c86bb.appspot.com',
  messagingSenderId: '998695277595',
  // eslint-disable-next-line prettier/prettier
  appId: '1:998695277595:web:6fc511d779f299482494be',
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// Call the seed file to populate Firestore database, comment out after initial run
// seedDatabase(firebase);

export { firebase, FieldValue };
