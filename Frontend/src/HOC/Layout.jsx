// import { Outlet } from "react-router-dom";
import { useState } from "react";
import LeftContainer from "../Components/LeftContainer";
import Register from "../Pages/Register";
import Login from "../Pages/Login";

const Layout = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div style={{ display: "flex" }}>
      <LeftContainer />
      <div style={{ flex: 1 }}>{isLogin ? <Login /> : <Register />}</div>
    </div>
  );
};

export default Layout;
