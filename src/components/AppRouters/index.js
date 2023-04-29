import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../../pages/Dashboard";
import AllPosts from "../../pages/AllPosts";
import RejectedPosts from "../../pages/RejectedPosts";
import PendingPosts from "../../pages/PendingPosts";
import ManageProfile from "../../pages/ManageProfile";
import ViewFullPost from "../../pages/ViewPost";
import RejectPostForm from "../../pages/RejectPostForm";
import ChangePassword from "../../pages/ChangePassword";
import LoginPage from "../../pages/Login";
import Search from "../../pages/Search";
import Cookies from "js-cookie";
import { UserContext } from "../../Context/userContext";

function AppRoutes() {
  const token = Cookies.get("admin-token");

  const { state } = useContext(UserContext);

  console.log("state from routes-->", state);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={state?.token ? <Dashboard /> : <LoginPage />} />
      <Route
        path="/pending-posts"
        element={state.token ? <PendingPosts /> : <LoginPage />}
      />
      <Route
        path="/all-posts"
        element={state.token ? <AllPosts /> : <LoginPage />}
      />
      <Route
        path="/profile"
        element={state.token ? <ManageProfile /> : <LoginPage />}
      ></Route>
      <Route
        path="/rejected-posts"
        element={state.token ? <RejectedPosts /> : <LoginPage />}
      ></Route>
      <Route
        path="/view/post/:id"
        element={state.token ? <ViewFullPost /> : <LoginPage />}
      />
      <Route
        path="/reject/post/:id"
        element={state.token ? <RejectPostForm /> : <LoginPage />}
      />
      <Route
        path="/change-password"
        element={state.token ? <ChangePassword /> : <LoginPage />}
      />
      <Route path="/search" element={state.token ? <Search /> : <Search />} />
    </Routes>
  );
}

export default AppRoutes;
