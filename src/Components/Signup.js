import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [useremail, setUseremail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:3010/users?email=${useremail}&password=${password}`);
      const user = response.data[0];

      if (user) {
        // Store the logged-in user's information
        localStorage.setItem("user", JSON.stringify(user));

        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Redirect to /posts with user information as a parameter
        window.location.href = `/posts?name=${user.name}&email=${user.email}&role=${user.role}`;
      } else {
        console.error("Invalid credentials");
        toast.error("Invalid credentials. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Error logging in. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="LoginPage d-flex justify-content-center align-items-center">
      <div className="card card-login-signup mt-5">
        <div className="card-body">
          <h4 className="card-title text-center mb-5">Login</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group my-4">
              <i className="uil uil-at input-icon"></i>
              <input
                type="email"
                className="form-control form-style"
                placeholder="Enter Your Email"
                name="loginEmail"
                value={useremail}
                onChange={(e) => setUseremail(e.target.value)}
              />
            </div>
            <div className="form-group my-4">
              <i className="uil uil-lock input-icon"></i>
              <input
                type="password"
                className="form-control form-style"
                placeholder="Enter Your Password"
                name="loginPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="text-center mt-3">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>

          <div className="text-center link my-4">
            <Link to="/login">Don't have an account? Signup</Link>
          </div>
        </div>
      </div>
      {/* Add the ToastContainer component */}
      <ToastContainer />
    </div>
  );
}
