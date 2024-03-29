import React from "react";
import Layout from "./Layout";
import JwtLogin from "../../authPages/JwtLogin";

const ProtectedRoute = () => {
  console.log("Inside protected");
  let token = document.cookie.includes("token");
  return token ? <Layout /> : <JwtLogin />;
};

export default ProtectedRoute;
