import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvouc5TILFfSwZv_c7WrFCs8oLKMib8j4",
  authDomain: "duckcord.firebaseapp.com",
  projectId: "duckcord",
  storageBucket: "duckcord.appspot.com",
  messagingSenderId: "901363857672",
  appId: "1:901363857672:web:33d0892592646c3fb9d4bd",
  databaseUrl: "https://duckcord-default-rtdb.firebaseio.com",
  measurementId: "G-L7VWX7QM2M",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const store = getFirestore(app);
