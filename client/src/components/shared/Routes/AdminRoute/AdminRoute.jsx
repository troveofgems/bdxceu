import {Outlet, Navigate} from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
    const
        { user } = useSelector((state) => state.auth),
        isAdmin = user?.authLevel === "admin" || false;

    if(!user) {
        return <Navigate to="/" />;
    }

    return isAdmin ? <Outlet /> : <Navigate to="/error401" replace />;
}

export default AdminRoute;