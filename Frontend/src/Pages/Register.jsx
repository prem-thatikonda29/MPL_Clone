import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../userContext";

import LeftContainer from "../Components/LeftContainer";
import styles from "../Styles/Auth.module.css";

const Register = () => {
  const nav = useNavigate();
  const { setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("User Registered:", formData);

    // Clear form
    setFormData({
      name: "",
      username: "",
      email: "",
      password: "",
    });

    // Send data to the server
    fetch("http://localhost:8000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response Data:", data); // Log the full response to check if data.user exists
        if (data.user) {
          // Store user in context after successful registration
          setUser(data.user);

          // Store user in localstorage for persisting on reloads
          localStorage.setItem("user", JSON.stringify(data.user));

          // Logging the user data for verification
          // console.log("User Data:", data.user);

          // Redirect to home page or any page after successful registration
          nav("/home");
        } else {
          console.error("User data is missing in the response");
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
        <h1 className={styles.heading}>Registration</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
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
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
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
            <button type="submit">Register</button>
          </div>
        </form>
        <div>
          <p>
            Already have an account? <a href="/login">Login here</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
