import { useAuthStore } from "@/store/auth";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  // Get the auth state from the store / or local storage (using localStorage.getItem("user"))
  const { auth } = useAuthStore();

  if (!auth) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
