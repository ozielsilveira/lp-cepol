import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = () => {
    const isAuthenticated = !!localStorage.getItem("authToken");

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />;
    }
};

export default ProtectedRoute;