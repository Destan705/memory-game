import "./Result.css";
import { useNavigate, useLocation } from "react-router-dom";

function getStars(won, moves, totalPairs) {
  if (!won) return 0;
  if (moves <= totalPairs * 1.5) return 3;
  if (moves <= totalPairs * 2.2) return 2;
  return 1;
}

function Result() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // If someone lands here directly (e.g. page refresh) there's no game data, send them home
  if (!state) {
    navigate("/");
    return null;
  }

  const {
    won,
    moves,
    timeLeft,
    timeLimit,
    totalPairs,
    pairsMatched,
    difficultyKey,
    difficultyLabel,
    theme,
  } = state;

  const stars = getStars(won, moves, totalPairs);
  const timeUsed = timeLimit - timeLeft;

  return (
    <div
      className={`result-page ${difficultyKey} d-flex flex-column align-items-center justify-content-center text-center`}
    >
      <h1 className="result-title">{won ? "You Win!" : "Time's Up"}</h1>

      <div className="star-row">
        {[1, 2, 3].map((n) => (
          <span key={n} className={`star ${n <= stars ? "filled" : ""}`}>
            ★
          </span>
        ))}
      </div>

      <div className="stats-card">
        <div className="stat-row">
          <span>Difficulty</span>
          <span>{difficultyLabel}</span>
        </div>
        <div className="stat-row">
          <span>Moves</span>
          <span>{moves}</span>
        </div>
        <div className="stat-row">
          <span>Time used</span>
          <span>{timeUsed}s</span>
        </div>
        <div className="stat-row">
          <span>Pairs matched</span>
          <span>
            {pairsMatched} / {totalPairs}
          </span>
        </div>
      </div>

      <div className="result-buttons d-flex gap-3 mt-4">
        <button
          className="play-again-button"
          onClick={() =>
            navigate(`/game/${difficultyKey}`, { state: { theme } })
          }
        >
          Play Again
        </button>
        <button className="choose-stage-button" onClick={() => navigate("/")}>
          Choose Stage
        </button>
      </div>
    </div>
  );
}

export default Result;
