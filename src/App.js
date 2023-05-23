import React, { useEffect, useState } from "react";
import "./App.scss";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import UserList from "./Components/UserList";
import HomePage from "./Components/HomePage/HomePage";
export default function App() {
  // const [accessToken, setAccessToken] = useState("");
  // useEffect(() => {
  //   setAccessToken(localStorage.getItem("accessToken"));
  // }, [localStorage.getItem("accessToken")]);
  const ProtectedRoute = ({ redirectPath = "/login", children }) => {
    if (!localStorage.getItem("accessToken")) {
      return <Navigate to={redirectPath} />;
    }
    return children;
  };
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/user-list"
            element={
              <ProtectedRoute>
                <UserList />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
