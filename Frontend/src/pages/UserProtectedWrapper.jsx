import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext }from "../context/UserContext";

const UserProtectedWrapper = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return <div>{children}</div>;
};

export default UserProtectedWrapper;
