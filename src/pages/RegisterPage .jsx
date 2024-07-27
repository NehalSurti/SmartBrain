import React from "react";
import { useAppContext } from "../context/AppContext";
import Register from "../components/Register";

function RegisterPage() {
  const { loadUser, onRouteChange } = useAppContext();
  return <Register loadUser={loadUser} onRouteChange={onRouteChange} />;
}

export default RegisterPage;
