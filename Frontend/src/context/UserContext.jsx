import axios from "axios";
import { createContext, useEffect, useState } from "react";

// Create a context

export const UserContext = createContext();

const UserContext = createContext();

// 2. Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("User Context Mounted");
    const token = localStorage.getItem("UserToken");
    if (token) {
      fetchUserFromToken(token);
    }
    else{
      setLoading(false);
    }
  }, []);

  const fetchUserFromToken = async (token) => {
    if (!token) {
      return;
    }
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/getProfile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (res.status === 200) {
        return setUser(res.data.user);
      }
    } catch (err) {
      console.error("Error fetching /user/getProfile:", err);
      setUser(null);
      localStorage.removeItem("UserToken");
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
