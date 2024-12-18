import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./userContext";

import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import GameLoader from "./Components/Gameloader";
import Wallet from "./Pages/Wallet";
import Profile from "./Pages/Profile";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/game/:id" element={<GameLoader />} />;
          <Route path="/wallet" element={<Wallet />} />;
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
