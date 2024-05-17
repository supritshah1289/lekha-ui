import React from "react";
import { ACCESS_TOKEN } from "../../constants";
import { Navigate, useSearchParams } from "react-router-dom";

export default function OAuth2NavigateHandler() {
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");

  console.log("token: " + token);

  if (token) {
    localStorage.setItem(ACCESS_TOKEN, token);
    return <Navigate to="/profile" />;
  } else {
    return <Navigate to="/login" />;
  }
}
