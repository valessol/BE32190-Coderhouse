import { createContext, useEffect, useState } from "react";
import axiosClient from "../config/axiosClient";
import { useNavigate, useLocation } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    authUser();
  }, []);

  const authUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axiosClient("/auth", config);
      setAuth(data);
      if (location.path === "/login") navigate("/");
    } catch (error) {
      setAuth({});
    }

    setLoading(false);
  };

  const logout = () => {
    setAuth({});
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        loading,
        setAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
