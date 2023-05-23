import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorResponse, setErrorResponse] = useState(false);
  const nav = useNavigate();
  const handleOnClickSignIn = async () => {
    if (email === "" || password === "") {
      setError(true);
    } else {
      setError(false);
      setErrorResponse(false);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      };
      let response = await fetch(
        "http://localhost:3000/api/login",
        requestOptions
      );
      if (response.status === 201) {
        let data = await response.json();
        localStorage.setItem("accessToken", JSON.stringify(data?.user?.token));
        nav("/");
      } else {
        let data = await response.json();
        setErrorResponse(true);
        setErrorMessage(data?.errors?.User);
      }
    }
  };
  return (
    <div className="LoginContainer">
      <div className="LoginMainsize">
        <h3>LOGIN</h3>
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
        {error && (
          <span style={{ fontSize: "12px", color: "red" }}>
            * Missing parameter
          </span>
        )}{" "}
        {errorResponse && (
          <span style={{ fontSize: "12px", color: "red" }}>
            * {errorMessage}
          </span>
        )}
        <button className="LoginButton" onClick={handleOnClickSignIn}>
          Sign In
        </button>
        <p>
          Don't have an account?{" "}
          <span onClick={() => nav("/register")}>Sign up</span>
        </p>
      </div>
    </div>
  );
}
