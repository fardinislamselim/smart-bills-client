import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import Loading from "../components/Loading";
import { AuthContext } from "../provider/AuthProvider";

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <Loading />;
    }

    if (user && user?.role === "admin") {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
