import { useState, useContext, useCallback } from 'react';
import { AuthContext, AuthProvider } from './AuthContext';
import { defaultAuthContext } from './AuthInterface';

export const AuthContextContainer = ({ children }) => {
  const [state, setState] = useState(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (token && Object.values(user).length) {
      return {
        ...defaultAuthContext,
        isAuthenticated: true,
      };
    }

    return defaultAuthContext;
  });

  const authenticateUser = useCallback((user) => {
    localStorage.setItem('token', user.token);
    localStorage.setItem('user', JSON.stringify(user));
    setState((prevState) => ({
      ...prevState,
      isAuthenticated: true,
    }));
  }, []);

  const logoutUser = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setState((prevState) => ({
      ...prevState,
      isAuthenticated: false,
    }));
  }, []);

  const getUser = useCallback(
    () => JSON.parse(localStorage.getItem('user')),
    []
  );

  return (
    <AuthProvider
      value={{
        isAuthenticated: state.isAuthenticated,
        authenticateUser,
        logoutUser,
        getUser,
      }}
    >
      {children}
    </AuthProvider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
