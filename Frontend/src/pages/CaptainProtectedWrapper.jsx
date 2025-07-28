import { useContext } from "react";
import { CaptainContext } from "../context/CaptainContext";
import { Navigate } from "react-router-dom";

const CaptainProtectedWrapper = ({ children }) => {
  const { captain, loading } = useContext(CaptainContext);

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (!captain) {
    return <Navigate to={"/captain-login"} />;
  }
  return <div>{children}</div>;
};

export default CaptainProtectedWrapper;
