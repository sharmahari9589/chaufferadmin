import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Router from "../../routes/Router";
import Sidebar from "../Sidebar/Sidebar";
import TopNav from "../TopNav/TopNav";

const Layout = () => {
  let token = document.cookie.includes("token");

  return (
    <>
      <div className="layout">
        <Sidebar />
        <div className="main__layout">
          <TopNav />
          <div className="content">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
