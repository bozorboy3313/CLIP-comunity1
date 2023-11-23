

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {

    
    apiKey: "AIzaSyDGBIcaSVeomG0Xjp-QkcBhCFC9x8IZ3kA",
    authDomain: "test-ade2b.firebaseapp.com",
    projectId: "test-ade2b",
    storageBucket: "test-ade2b.appspot.com",
    messagingSenderId: "655590779623",
    appId: "1:655590779623:web:e18fbd78356b75e04a5042",
    measurementId: "G-105YKDPTH6"
}


const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);
const db = getFirestore(app);

export { authentication, db };