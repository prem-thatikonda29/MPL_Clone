import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// importing the dynamic game loader
import GameLoader from "./Components/Gameloader.jsx";

// importing the context provider
import { UserProvider } from "./userContext.jsx";

// Import other components
import Register from "./Pages/Register.jsx";
import Login from "./Pages/Login.jsx";
import Home from "./Pages/Home.jsx";
import Robot from "./Models/Robot.jsx";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Dynamic game route */}
          <Route path="/game/:id" element={<GameLoader />} />

          <Route path="/test" element={<Robot />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
