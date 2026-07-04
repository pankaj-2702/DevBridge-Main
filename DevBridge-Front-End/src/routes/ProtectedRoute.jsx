import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  // If React state is empty, check localStorage
  const storedToken = token || localStorage.getItem("token");

  if (!storedToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;