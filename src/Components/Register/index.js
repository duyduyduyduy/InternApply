import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
function Register(props) {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorResponse, setErrorResponse] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const nav = useNavigate();
  const handleOnClickSignup = async () => {
    if (username === "" || email === "" || password === "") {
      setError(true);
    } else {
      setError(false);
      setErrorResponse(false);
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      };
      let response = await fetch(
        "http://localhost:3000/api/users",
        requestOptions
      );
      if (response.status === 201) {
        let data = await response.json();
        localStorage.setItem("accessToken", JSON.stringify(data?.user?.token));
        nav("/");
      } else {
        let data = await response.json();
        setErrorResponse(true);
        setErrorMessage(data?.errors?.username);
      }
    }
  };
  return (
    <div className="LoginContainer">
      <div className="LoginMainsize">
        <h3>REGISTER</h3>
        <input
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Username"
        />
        <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
        />
        {error && (
          <span style={{ fontSize: "12px", color: "red" }}>
            * Missing parameter
          </span>
        )}
        {errorResponse && (
          <span style={{ fontSize: "12px", color: "red" }}>
            * {errorMessage}
          </span>
        )}
        <button onClick={handleOnClickSignup} className="LoginButton">
          Sign Up
        </button>
      </div>
    </div>
  );
}
const mapStateToProps = (state, ownProps) => {
  return {
    UserStore: state.UserStore,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
