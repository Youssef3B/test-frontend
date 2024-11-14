import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useContext, createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

function AuthUserProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
    }
  }, []);

  async function login(email, password) {
    const data = { email, password };
    try {
      const url = "https://test-deploy-api-0e9g.onrender.com/api/auth/login";
      const res = await axios.post(url, data);
      if (res.data.data) {
        const token = res.data.data;
        localStorage.setItem("token", token);

        const decoded = jwtDecode(token);
        setUser(decoded);
        toast.success("Login successful");

        return decoded;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      throw error;
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload();
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuthUser() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("User Context used outside the User Provider");
  }
  return context;
}

export { AuthUserProvider, useAuthUser };
