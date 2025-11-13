import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "../components/Loading";

const PrivetRout = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <div className="flex justify-center items-center"><Loading /></div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivetRout;
