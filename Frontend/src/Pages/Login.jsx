import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../Styles/Auth.module.css";
import LeftContainer from "../Components/LeftContainer.jsx";

const Login = () => {
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // const [user, setUser] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear form
    setFormData({
      username: "",
      password: "",
    });

    // Send data to the server
    fetch("http://localhost:8000/auth/login", {
      method: "POST", // Specify the request method
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.token) {
          // Store token and navigate to home
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", data.user._id);
          nav("/home");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <section className={styles.container}>
      <LeftContainer />
      <div className={styles.form}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              autoComplete="off"
            />
          </div>
          <div>
            <a href="/forgot-password" className={styles.forgotLink}>
              Forgot password?
            </a>
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
        <div>
          <p>
            Don&apos;t have an account? <a href="/register">Register here</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
