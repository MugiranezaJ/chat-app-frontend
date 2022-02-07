import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const isAuthenticated = localStorage.getItem("mechat_access_token");

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute;
