import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDDq98wa7zGvazPRp95HFx5wwJpXJgeK-w",
  authDomain: "review-my-case.firebaseapp.com",
  projectId: "review-my-case",
  storageBucket: "review-my-case.firebasestorage.app",
  messagingSenderId: "301403962582",
  appId: "1:301403962582:web:a151e94b22bb9181091d77",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
