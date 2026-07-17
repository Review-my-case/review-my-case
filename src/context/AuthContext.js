import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/config";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("user");
  const [profile, setProfile] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      if (!firebaseUser) {
        setRole("user");
        setProfile(null);
        setInitializing(false);
      }
    });
    return unsubscribeAuth;
  }, []);

  useEffect(() => {
    if (!user) return;

    const timeout = setTimeout(() => setInitializing(false), 8000);

    const unsubscribeProfile = onSnapshot(
      doc(db, "users", user.uid),
      (snap) => {
        clearTimeout(timeout);
        const data = snap.exists() ? snap.data() : {};
        setRole(data.role || "user");
        setProfile(data);
        setInitializing(false);
      },
      (error) => {
        clearTimeout(timeout);
        console.error("Profile listener error:", error.message);
        setRole("user");
        setInitializing(false);
      }
    );

    return () => {
      clearTimeout(timeout);
      unsubscribeProfile();
    };
  }, [user]);

  const clearError = () => setAuthError(null);

  const signUp = async (name, email, phone, password) => {
    setAuthError(null);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: name });
      await setDoc(doc(db, "users", cred.user.uid), {
        name,
        email,
        phone,
        role: "user",
        verificationStatus: "not_submitted",
        idPhotoUrl: null,
        selfiePhotoUrl: null,
        createdAt: serverTimestamp(),
      });
      return cred.user;
    } catch (e) {
      setAuthError(friendlyError(e.code));
      throw e;
    }
  };

  const signIn = async (email, password) => {
    setAuthError(null);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      return cred.user;
    } catch (e) {
      setAuthError(friendlyError(e.code));
      throw e;
    }
  };

  const signOut = () => firebaseSignOut(auth);

  return (
    <AuthContext.Provider value={{ user, role, profile, initializing, authError, clearError, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

function friendlyError(code) {
  const map = {
    "auth/email-already-in-use": "An account with this email already exists.",
    "auth/invalid-email": "That email address doesn't look right.",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/user-not-found": "No account found with that email.",
    "auth/wrong-password": "Incorrect password.",
    "auth/invalid-credential": "Incorrect email or password.",
  };
  return map[code] || "Something went wrong. Please try again.";
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
