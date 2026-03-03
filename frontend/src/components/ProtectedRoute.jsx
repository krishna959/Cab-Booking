import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // If role mismatch, redirect to login
  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the protected children
  return children;
}

export default ProtectedRoute;
