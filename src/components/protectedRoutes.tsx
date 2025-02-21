import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
        return <Navigate to="/auth" replace />;
    } else {
        if (IsValidToken(token)) {
            return children;
        } else {
            localStorage.removeItem("authToken");
            return <Navigate to="/auth" replace />;
        }
    }
};

const IsValidToken = (token: string): boolean => {
    try {
        const payload = token.split('.')[1];
        const decodedPayload = atob(payload);
        const jsonPayload = JSON.parse(decodedPayload);

        const expiration = jsonPayload.exp;
        const now = Math.floor(Date.now() / 1000);

        return now < expiration;
    } catch (error) {
        console.error('Erro ao verificar o token:', error);
        return false;
    }
};

export default ProtectedRoute;