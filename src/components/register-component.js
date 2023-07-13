import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const RegisterComponent = () => {
  const navigate = useNavigate();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("");
  let [message, setMessage] = useState("");

  const handleChangeUsername = (e) => {
    setUsername(e.target.value)
  }
  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }
  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }
  const handleChangeRole = (e) => {
    setRole(e.target.value)
  }
  const handleRegister = () => {
    AuthService.register(username, email, password, role)
      .then(() => {
        window.alert("Register succeeds. You are now redirect to the login page.");
        navigate("/MERN-client/login");
      })
      .catch((err) => {
        console.log(err.response);
        setMessage(err.response.data);
      })
  }

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>{/* 這邊不需要用 <Form></Form> */}
        {message && <div className="alert alert-danger">{message}</div>}
        <div>
          <label htmlFor="username">Username</label>
          <input onChange={handleChangeUsername}
            type="text" className="form-control" name="username" />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email">email</label>
          <input onChange={handleChangeEmail}
            type="text" className="form-control" name="email" />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input onChange={handleChangePassword}
            type="password" className="form-control" name="password" />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="role">role</label>
          <select onChange={handleChangeRole} className="form-control" name="role">
            <option value="">請選擇身分</option>
            <option value="student">student</option>
            <option value="instructor">instructor</option>
          </select>
        </div>
        <br />
        <button onClick={handleRegister}
          className="btn btn-primary">
          <span>Register</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterComponent;
