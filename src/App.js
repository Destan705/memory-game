import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import MemoryGame from "./components/MemoryGame/MemoryGame";
import Result from "./components/Result/Result";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/game/easy"
        element={
          <MemoryGame
            numOfCards={6}
            difficultyKey="easy"
            difficultyLabel="EASY"
            timeLimit={60}
          />
        }
      />
      <Route
        path="/game/medium"
        element={
          <MemoryGame
            numOfCards={10}
            difficultyKey="medium"
            difficultyLabel="MEDIUM"
            timeLimit={90}
          />
        }
      />
      <Route
        path="/game/hard"
        element={
          <MemoryGame
            numOfCards={18}
            difficultyKey="hard"
            difficultyLabel="HARD"
            timeLimit={120}
          />
        }
      />
      <Route path="/result" element={<Result />} />
    </Routes>
  );
}

export default App;
