import React, { useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { signInWithGoogle } from './AuthGoogle.jsx';
import PropTypes from 'prop-types';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, [auth]);

  const value = {
    currentUser,
    signInWithGoogle
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };