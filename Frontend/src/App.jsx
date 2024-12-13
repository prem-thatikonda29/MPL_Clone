import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FlappyBird from "./Games/FlappyBird.jsx";
import Register from "./Pages/Register.jsx";
import Login from "./Pages/Login.jsx";
import Home from "./Pages/Home.jsx";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/flappybird" element={<FlappyBird />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
