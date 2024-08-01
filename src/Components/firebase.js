import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANvyA4Vt89bStZrjKK9TR3e6-96gIwGBA",
  authDomain: "login-auth-a6e3c.firebaseapp.com",
  projectId: "login-auth-a6e3c",
  storageBucket: "login-auth-a6e3c.appspot.com",
  messagingSenderId: "740133957082",
  appId: "1:740133957082:web:4b661dcd716ec90d86a4e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth();
export const db = getFirestore(app);
export default app;
