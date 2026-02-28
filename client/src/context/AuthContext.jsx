import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/config";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  // true while Firebase resolves the initial auth state on page load
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe; // cleanup listener on unmount
  }, []);

  // Returns the current Firebase ID token (auto-refreshed by Firebase SDK)
  const getIdToken = async () => {
    if (!currentUser) return null;
    return await currentUser.getIdToken();
  };

  // Email + password sign-up with optional username (sets displayName)
  const signUpWithEmail = async (email, password, username) => {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    if (username) {
      await updateProfile(credential.user, { displayName: username });
      // Force refresh so currentUser.displayName is up to date immediately
      await credential.user.reload();
      setCurrentUser({ ...credential.user });
    }
    return credential;
  };

  // Email + password login
  const loginWithEmail = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  // Google OAuth popup
  const loginWithGoogle = () => signInWithPopup(auth, googleProvider);

  // Sign out
  const logout = () => signOut(auth);

  const value = {
    currentUser,
    loading,
    getIdToken,
    signUpWithEmail,
    loginWithEmail,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Don't render children while Firebase is initialising to avoid
          flashing the wrong page before auth state is known */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Convenience hook
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};
