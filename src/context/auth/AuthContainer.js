import { useState, useContext, useCallback } from "react";
import { AuthContext, AuthProvider } from "context/auth/AuthContext";
import { defaultAuthContext } from "context/auth/AuthInterface";
import jwt_decode from "jwt-decode";

export const AuthContextContainer = ({ children }) => {
  const [state, setState] = useState(() => {
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN_FIELD);
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (token && Object.values(user).length) {
      return {
        ...defaultAuthContext,
        isAuthenticated: true,
      };
    }

    return defaultAuthContext;
  });

  const decodeJwt = useCallback((token) => {
    const decoded = jwt_decode(token, { header: false });
    const { iat, exp, ...user } = decoded;
    return user;
  }, []);

  const authenticateUser = useCallback(
    (token) => {
      const user = decodeJwt(token);
      localStorage.setItem(process.env.REACT_APP_TOKEN_FIELD, token);
      localStorage.setItem("user", JSON.stringify(user));
      setState((prevState) => ({
        ...prevState,
        isAuthenticated: true,
      }));
    },
    [decodeJwt]
  );

  const logoutUser = useCallback(() => {
    localStorage.removeItem(process.env.REACT_APP_TOKEN_FIELD);
    localStorage.removeItem("user");
    setState((prevState) => ({
      ...prevState,
      isAuthenticated: false,
    }));
  }, []);

  const getUser = useCallback(
    () => JSON.parse(localStorage.getItem("user") || ""),
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
