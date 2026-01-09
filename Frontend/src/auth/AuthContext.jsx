import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Restore session
  useEffect(() => {
    const token = localStorage.getItem("kalp_token");
    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get("/auth/me")
      .then((res) => setUser(res.data.user))
      .catch(() => {
        localStorage.removeItem("kalp_token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // ✅ FIXED LOGIN SIGNATURE
  const login = async ({ email, password }) => {
    const { data } = await api.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem("kalp_token", data.token);
    setUser(data.user);
  };

  const signup = async (payload) => {
    const { data } = await api.post("/auth/signup", payload);
    localStorage.setItem("kalp_token", data.token);
    setUser(data.user);
  };

  // 🔐 OTP
  const requestOtp = async (email) => {
    await api.post("/auth/request-otp", { email });
  };

  const verifyOtp = async ({ email, otp }) => {
    const { data } = await api.post("/auth/verify-otp", { email, otp });
    localStorage.setItem("kalp_token", data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("kalp_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        requestOtp,
        verifyOtp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
