import React, { useState, useEffect, useContext, createContext } from "react";

import * as authApi from "./auth-api";

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const requestWrap = request => async (...args) => {
    try {
      setLoading(true);
      const result = await request(...args);
      console.log("request result............", result);
      return result;
    } catch (e) {
      console.log("request: error", e);
      alert(e.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signin = async (email, password) => {
    console.log("sign in email", email);
    console.log("sign in password", password);

    requestWrap(authApi.signin)(email, password);
  };

  const signup = async (email, password) => {
    email = "11200229@qq.com";
    password = "123456";

    requestWrap(authApi.signup)(email, password);
  };

  const signout = () => {
    requestWrap(authApi.signout)();
  };

  const sendPasswordResetEmail = email => {
    requestWrap(authApi.sendPasswordResetEmail)(email);
  };

  const confirmPasswordReset = (code, password) => {
    requestWrap(authApi.confirmPasswordReset)(code, password);
  };

  useEffect(() => {
    console.log("Set user state subscription ..............");
    const unsubscribe = authApi.subscribe_user_state(user => {
      console.log("Subscribe user state changed ..............", user);
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    loading,
    user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset
  };
}
