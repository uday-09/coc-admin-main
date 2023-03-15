import "./App.css";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import AppContent from "./components/AppContent";
import SideMenu from "./components/SideMenu";
import { Space } from "antd";

function App() {
  return (
    <div className="App">
      <AppHeader></AppHeader>
      <Space className="sideMenuAndPageContent">
        <SideMenu></SideMenu>
        <AppContent></AppContent>
      </Space>
      <AppFooter></AppFooter>
    </div>
  );
}

export default App;
