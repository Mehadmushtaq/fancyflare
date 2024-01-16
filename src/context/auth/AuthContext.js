import React from "react";
import { defaultAuthContext } from "context/auth/AuthInterface";

export const AuthContext = React.createContext(defaultAuthContext);
export const AuthProvider = AuthContext.Provider;
export const AuthConsumer = AuthContext.Consumer;
