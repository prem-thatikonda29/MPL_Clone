import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const nav = useNavigate();

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
        console.log("Message:", data);
        if (data.token) {
          // Store token and navigate to home
          localStorage.setItem("token", data.token);
          nav("/home");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="w-screen h-screen min-h-screen bg-gradient-to-br from-red-700 via-black to-red-900 flex items-center justify-center">
      <div className="bg-black bg-opacity-70 p-8 rounded-lg w-full sm:w-96">
        <h1 className="text-4xl font-extrabold text-center text-white mb-6">
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-white font-semibold" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-2 rounded-md text-gray-800"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-6">
            <label className="text-white font-semibold" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-2 rounded-md text-gray-800"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-red-800 py-2 rounded-md text-white font-bold hover:bg-gradient-to-l focus:outline-none"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-white text-sm">
            Don't have an account?{" "}
            <a href="/register" className="text-red-400 hover:text-red-600">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
