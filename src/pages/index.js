import React from "react";
import AppHeader from "../components/AppHeader";
import { Space } from "antd";
import SideMenu from "../components/SideMenu";
import AppContent from "../components/AppContent";
import AppFooter from "../components/AppFooter";
import AppRoutes from "../components/AppRouters";

function AuthPages() {
  console.log("---->From auth pages");
  return (
    <div>
      <AppHeader></AppHeader>
      <Space className="sideMenuAndPageContent">
        <SideMenu></SideMenu>
        <AppContent></AppContent>
      </Space>
      <AppFooter></AppFooter>
    </div>
  );
}

export default AuthPages;
