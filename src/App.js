import logo from "./logo.svg";
import "./App.css";
import MemoryGame from "./components/MemoryGame/MemoryGame";

function App() {
  return (
    <div className="App">
      <MemoryGame numOfCards={4} />
    </div>
  );
}

export default App;
