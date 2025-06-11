import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  let storedUser = null;
  try {
    const userData = localStorage.getItem("user");
    if (userData && userData !== "undefined") {
      storedUser = JSON.parse(userData);
    }
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
  }

  const [user, setUser] = useState(storedUser);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
