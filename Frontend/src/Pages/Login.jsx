import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../userContext";
import styles from "../Styles/Auth.module.css";
import LeftContainer from "../Components/LeftContainer.jsx";
import toast from "react-hot-toast";

const Login = () => {
  const nav = useNavigate();
  const { setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    username: "",
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

    // Clear form after submitting
    setFormData({
      username: "",
      password: "",
    });

    // Send data to the server
    fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.token) {
          // Store token and user details in local storage
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          setUser(data.user);

          toast.success("Login successful");

          // Redirect to home page
          nav("/home");
        } else {
          console.log("Login failed: ", data.message);
          // Handle login failure (e.g., show error message)
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
        <h1 className={styles.heading}>Login</h1>
        <form onSubmit={handleSubmit}>
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
            <a className={styles.forgotLink}>Forgot password?</a>
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
