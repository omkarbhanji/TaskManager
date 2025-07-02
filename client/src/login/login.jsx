import axios from "axios";
import React, { use } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Login.module.css'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(username + " " + password);
    try {
      const loginInfo = {
        email: username,
        password: password,
      };

      console.log(loginInfo);
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        loginInfo
      );

      if (response.status === 200) {
        const token = response.data.token;
        console.log("I am here !");
        localStorage.setItem("token", token);
        console.log(localStorage.getItem("token"));
        setLoginSuccess(true);
      } else {
        setErrorMessage(response.data);
      }
    } catch (err) {
      console.log(err.response.data.message);
      setErrorMessage(err.response.data.message);
    }
  };

  useEffect(() => {
    if (loginSuccess) {
      navigate("/");
    }
  }, [loginSuccess, navigate]);

  return (
   <div >
    <h2>Login</h2>
  <form onSubmit={handleSubmit}>
    <label>Username:</label>
    <input
      type="text"
      placeholder="username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />

    <label>Password:</label>
    <input
      type="password"
      placeholder="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <button type="submit" disabled={!username || !password}>
      Login
    </button>
  </form>

  {errorMessage && (
    <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>
  )}
</div>
  );
};

export default Login;
