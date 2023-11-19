import React from "react";
import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const [Cookie] = useCookies(["access_token"]);
  return <>{Cookie.access_token ? <Outlet /> : <Navigate to={"/"} />}</>;
}

export default PrivateRoute;
