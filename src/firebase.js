import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyDO-5PZUGJlP1KZfiMsmy9f0SOGa__Qeg4",

    authDomain: "crud-react-d35a4.firebaseapp.com",

    projectId: "crud-react-d35a4",

    storageBucket: "crud-react-d35a4.appspot.com",

    messagingSenderId: "269203503364",

    appId: "1:269203503364:web:82c8ab2f0061ed2e8eb851"

};


// Initialize Firebase

app.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();

export { db, auth }