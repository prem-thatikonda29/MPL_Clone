import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const nav = useNavigate();

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
    console.log("User Registered:", formData);

    // Clear form
    setFormData({
      name: "",
      username: "",
      email: "",
      password: "",
    });

    // Send data to the server
    fetch("http://localhost:8000/auth/register", {
      method: "POST", // Specify the request method
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Message:", data);
        // Redirect to login page
        nav("/home");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="w-screen h-screen min-h-screen bg-gradient-to-br from-red-700 via-black to-red-900 flex items-center justify-center">
      <div className="bg-black bg-opacity-70 p-8 rounded-lg w-full sm:w-96">
        <h1 className="text-4xl font-extrabold text-center text-white mb-6">
          Registration
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-white font-semibold" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-2 rounded-md text-gray-800"
              placeholder="Enter your full name"
              required
            />
          </div>
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
          <div className="mb-4">
            <label className="text-white font-semibold" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-2 rounded-md text-gray-800"
              placeholder="Enter your email"
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
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-white text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-red-400 hover:text-red-600">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
