import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../../pages/Dashboard";
import AllPosts from "../../pages/AllPosts";
import RejectedPosts from "../../pages/RejectedPosts";
import PendingPosts from "../../pages/PendingPosts";
import ManageProfile from "../../pages/ManageProfile";
import ViewFullPost from "../../pages/ViewPost";
import RejectPostForm from "../../pages/RejectPostForm";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/pending-posts" element={<PendingPosts />} />
      <Route path="/all-posts" element={<AllPosts />} />
      <Route path="/profile" element={<ManageProfile />}></Route>
      <Route path="/rejected-posts" element={<RejectedPosts />}></Route>
      <Route path="/view/post/:id" element={<ViewFullPost />} />
      <Route path="/reject/post/:id" element={<RejectPostForm />} />
    </Routes>
  );
}

export default AppRoutes;
