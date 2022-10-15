import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const [Login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    e.persist();
    setLogin({ ...Login, [e.target.name]: e.target.value });
  };

  const login = (e) => {
    e.preventDefault();
    axios
      .post("/user/login", {
        email: Login.email,
        password: Login.password,
      })
      .then(function (response) {
        localStorage.setItem("token", response.data.data);
        Swal.fire({
          icon: "success",
          text: "Login Successfully Done",
        });
        navigate("/");
        window.location.reload();
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          text: "Email or password Invalid",
        });
      });
  };

  return (
    <div className="my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h2>Login</h2>
            </div>
            <div className="card-body">
              <form onSubmit={login} action="" className="form-group">
                <div className="form-group">
                  <label htmlFor="">Enter Your E-mail</label>
                  <input
                    onChange={handleInput}
                    value={login.email}
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Enter Your Password</label>
                  <input
                    onChange={handleInput}
                    name="password"
                    value={login.password}
                    type="password"
                    className="form-control"
                    minLength={8}
                    placeholder="Password"
                  />
                </div>
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-sm btn-success tex-center"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
