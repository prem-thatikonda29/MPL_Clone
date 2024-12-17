import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./userContext";

import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import GameLoader from "./Components/Gameloader";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/game/:id" element={<GameLoader />} />;
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
