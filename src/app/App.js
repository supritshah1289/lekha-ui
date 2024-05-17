import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AppHeader from "../common/header/AppHeader";
import LoadingIndicator from "../common/LoadingIndicator";
import { getCurrentUser } from "../util/APIUtils";
import { ACCESS_TOKEN } from "../constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AppRoutes from "./AppRoutes";
import { Container } from "@mui/material";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    loadCurrentlyLoggedInUser();
  }, [authenticated, isLoading]);

  function loadCurrentlyLoggedInUser() {
    getCurrentUser()
      .then((response) => {
        console.log(response);
        setCurrentUser(response);
        setAuthenticated(true);
        setIsloading(false);
      })
      .catch((error) => {
        setIsloading(false);
      });
  }

  function handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    setCurrentUser(null);
    setAuthenticated(false);
    toast.success("You're safely logged out!", {
      position: toast.POSITION.TOP_CENTER,
    });
    <Navigate to="/" />;
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <div>
      <Container>
        <AppHeader currentUser={currentUser} onLogout={handleLogout} />
      </Container>
      <Container maxWidth="lg" style={{ marginTop: "64px", padding: "10px" }}>
        <AppRoutes authenticated={authenticated} currentUser={currentUser} />
      </Container>
      <ToastContainer />
    </div>
  );
}

export default App;
