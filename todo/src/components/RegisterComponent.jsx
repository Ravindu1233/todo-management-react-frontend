import React, { useState } from "react";
import { registerAPICall } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterComponent = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleRegistrationForm(e) {
    e.preventDefault();

    const register = { name, username, email, password };

    console.log(register);

    registerAPICall(register)
      .then((response) => {
        toast.success("Registration successful!");
        setTimeout(() => navigate("/login"), 2000);
      })
      .catch((error) => {
        toast.error("Registration failed. Please try again.");
        console.error(error);
      });
  }

  return (
    <div className="container">
      <ToastContainer position="top-center" />
      <br /> <br />
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">User Registration Form</h2>
            </div>
            <div className="card-body">
              <form>
                <div className="row mb-3">
                  <label className="col-md-3 control-label">Name</label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-md-3 control-label">Username</label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      placeholder="Enter Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-md-3 control-label">Email</label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      placeholder="Enter Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-md-3 control-label">Password</label>
                  <div className="col-md-9">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="form-group mb-3">
                  <button
                    className="btn btn-primary"
                    onClick={(e) => handleRegistrationForm(e)}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
