// context/AuthContext.jsx
import { createContext, useEffect, useState } from "react";
import { storage } from "../utils/storage";

export const AuthContext = createContext();

const MOCK_USER = {
  name: "Dev Admin",
  email: "dev@admin.com",
  role: "admin",
  _id: "mock-admin-id"
};

export default function AuthProvider({ children }) {
  // Initialize with MOCK_USER if no user is found in storage to bypass auth
  const [user, setUser] = useState(storage.getUser() || MOCK_USER);
  const [token, setToken] = useState(storage.getToken() || "mock-token-for-dev");
  const [loading, setLoading] = useState(false);

  const login = (token, user) => {
    storage.saveUser(token, user);
    setUser(user);
    setToken(token);
  };

  const logout = () => {
    storage.logout();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
