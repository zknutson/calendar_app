// firebase-config.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDfZbzM6b9A_LVV5rIG1oIjXXkU92JSpmU",
  authDomain: "roombas-calendar-app.firebaseapp.com",
  projectId: "roombas-calendar-app",
  storageBucket: "roombas-calendar-app.appspot.com",
  messagingSenderId: "122865558778",
  appId: "1:122865558778:web:b4bbf5dc328f2263c4d543"
};


const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db };