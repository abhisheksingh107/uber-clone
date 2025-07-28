import { createContext, useEffect, useState } from "react";
import axios from "axios";

// Creating a Context
export const CaptainContext = createContext();

export const CaptainProvider = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("Captain Context Mount");
    const token = localStorage.getItem("captainToken");
    if (token) {
      fetchCaptainFromToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchCaptainFromToken = async (token) => {
    if (!token) {
      return;
    }
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/captain/getCaptainProfile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setCaptain(res.data.captain);
      } else {
        throw new Error("Unauthorized or invalid response");
      }
    } catch (error) {
      console.error(error);
      setCaptain(null);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CaptainContext.Provider value={{ captain, setCaptain, loading }}>
      {children}
    </CaptainContext.Provider>
  );
};
