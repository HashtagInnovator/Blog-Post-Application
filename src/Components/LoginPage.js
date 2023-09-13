import React, { useState } from "react";
import "../Assets/Style.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!username || !useremail || !password) {
      toast.error("Please fill in all fields.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    try {
      // Create a new user object
      const newUser = {
        name: username,
        email: useremail,
        password: password,
        role: "User", // You can set the role as needed
      };

      // Send a POST request to add the new user to the JSON server
      const response = await axios.post("http://localhost:3010/users", newUser);

      console.log("User added:", response.data);

      // Clear the form after successful submission
      setUsername("");
      setUseremail("");
      setPassword("");

      // Show a success toast notification
      toast.success("User registered successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error adding user:", error);

      // Show an error toast notification
      toast.error("Error registering user. Please try again.", {
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
          <h4 className="card-title text-center mb-5">Signup</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group my-4">
              <i className="uil uil-user input-icon"></i>
              <input
                type="text"
                className="form-control form-style"
                name="signupName"
                placeholder="Enter Your Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group my-4">
              <i className="uil uil-at input-icon"></i>
              <input
                type="email"
                className="form-control form-style"
                placeholder="Enter Your Email"
                name="signupEmail"
                value={useremail}
                onChange={(e) => setUseremail(e.target.value)}
                required
              />
            </div>
            <div className="form-group my-4">
              <i className="uil uil-lock input-icon"></i>
              <input
                type="password"
                className="form-control form-style"
                placeholder="Enter Your Password"
                name="signupPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="text-center mt-3">
              <button type="submit" className="btn btn-primary">
                Signup
              </button>
            </div>
          </form>

          <div className="text-center link my-4">
            <Link to="/signup">Already a Member?</Link>
          </div>
        </div>
      </div>
      {/* Add the ToastContainer component */}
      <ToastContainer />
    </div>
  );
}
