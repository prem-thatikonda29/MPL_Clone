import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FlappyBird from "./Games/FlappyBird.jsx";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<FlappyBird />} />
          <Route path="/flappybird" element={<FlappyBird />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
