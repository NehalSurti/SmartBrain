import React from "react";
import Signin from "../components/Signin";
import { useAppContext } from "../context/AppContext";

function SigninPage() {
  const { loadUser, onRouteChange } = useAppContext();
  return <Signin loadUser={loadUser} onRouteChange={onRouteChange} />;
}

export default SigninPage;
