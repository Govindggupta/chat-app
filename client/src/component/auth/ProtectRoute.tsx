import { Navigate, Outlet } from "react-router-dom";

interface ProtectRouteProps {
    user: boolean;
    redirect?: string;
}

const ProtectRoute = ({ user, redirect = "/login" }: ProtectRouteProps) => {
    if (!user) {
        return <Navigate to={redirect} />;
    }
    return <Outlet />;
}

export default ProtectRoute;

