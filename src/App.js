import "./App.css";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import AppContent from "./components/AppContent";
import SideMenu from "./components/SideMenu";
import { Space } from "antd";
import { UserProvider } from "./Context/userContext";

function App() {
  return (
    <UserProvider>
      <div className="App">
        <AppHeader></AppHeader>
        <Space className="sideMenuAndPageContent">
          <SideMenu></SideMenu>
          <AppContent></AppContent>
        </Space>
        <AppFooter></AppFooter>
      </div>
    </UserProvider>
  );
}

export default App;
