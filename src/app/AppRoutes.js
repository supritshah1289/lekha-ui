import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../home/Home";
import Login from "../user/login/Login";
import Signup from "../user/signup/Signup";
import Profile from "../user/profile/Profile";
import OAuth2RedirectHandler from "../user/oauth2/OAuth2RedirectHandler";
import NotFound from "../common/NotFound";
import PrivateRoute from "../common/PrivateRoute";
import Dashboard from "../user/dashboard/Dashboard";
import MyItems from "../user/MyItems/MyItems";
import Post from "../common/Post";
import Message from "../user/message/Message";

function AppRoutes({ authenticated, currentUser }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login authenticated={authenticated} />} />
      <Route
        path="/signup"
        element={<Signup authenticated={authenticated} />}
      />
      <Route element={<PrivateRoute currentUser={currentUser} />}>
        <Route
          path="/profile"
          element={
            <Profile authenticated={authenticated} currentUser={currentUser} />
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inbox" element={<Message />} />
        <Route
          path="/myItems"
          element={<MyItems currentUser={currentUser} />}
        />
        <Route path="/post" element={<Post currentUser={currentUser} />} />
      </Route>
      <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
