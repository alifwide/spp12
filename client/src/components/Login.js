import React, { useState } from "react";
import "../styles/style.css"
import { Redirect } from "react-router-dom";
import axios from "axios";

export default function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  function loginHandler() {
    axios({
      method: "post",
      url: "http://localhost:3001/login",
      data: {
        level: "admin",
        username: username,
        password: password,
      }
    }
    ).then(response => {
      if (response.data.token) {
        setMessage("")
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('level', response.data.level);
      } else {
        setMessage(response.data.message)
      }
    })
  }

  return (
    <div>
      <div className="login-grid">
        <h3>Login</h3>
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="username" className="form-control" id="username" placeholder="Enter username" value={username} onChange={(ev) => setUsername(ev.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(ev) => setPassword(ev.target.value)} />
          </div>
          <p className="text-danger">{message}</p>

          <button type="button" className="btn btn-primary" onClick={loginHandler}>Submit</button>
        </form>
      </div>
    </div>
  )
}