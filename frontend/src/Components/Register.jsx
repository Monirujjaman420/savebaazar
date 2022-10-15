import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const [Register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    e.persist();
    setRegister({ ...Register, [e.target.name]: e.target.value });
  };

  const register = (e) => {
    e.preventDefault();
    axios
      .post("/user/register", {
        name: Register.name,
        email: Register.email,
        password: Register.password,
      })
      .then(function (response) {
        Swal.fire({
          icon: "success",
          text: "Register Successfully Done",
        });
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
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
              <form onSubmit={register} action="" className="form-group">
                <div className="form-group">
                  <label htmlFor="">Enter Your Full Name</label>
                  <input
                    onChange={handleInput}
                    value={Register.name}
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="full Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Enter Your E-mail</label>
                  <input
                    onChange={handleInput}
                    value={Register.email}
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
                    value={Register.password}
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
                <input
                  type="submit"
                  value="Register"
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

export default Register;
