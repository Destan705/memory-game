import "./MemoryGame.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { emojiUrl } from "../utils/emoji";
import { ICON_SETS } from "../utils/iconSets";

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function MemoryGame({ numOfCards, difficultyKey, difficultyLabel, timeLimit }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const themeKey = state?.theme || "animals";
  const theme = ICON_SETS[themeKey] || ICON_SETS.animals;

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [mismatch, setMismatch] = useState([]);
  const [moves, setMoves] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [locked, setLocked] = useState(false);
  const finishedRef = useRef(false);

  useEffect(() => {
    const icons = theme.icons.slice(0, numOfCards);
    setCards(shuffle([...icons, ...icons]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numOfCards, themeKey]);

  useEffect(() => {
    if (finishedRef.current) return;
    if (timeLeft <= 0) {
      finishGame(false);
      return;
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  // Win check
  useEffect(() => {
    if (cards.length > 0 && matched.length === cards.length) {
      finishGame(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matched, cards]);

  function finishGame(won) {
    if (finishedRef.current) return;
    finishedRef.current = true;
    navigate("/result", {
      state: {
        won,
        moves,
        timeLeft,
        timeLimit,
        totalPairs: numOfCards,
        pairsMatched: matched.length / 2,
        difficultyKey,
        difficultyLabel,
        theme: themeKey,
      },
    });
  }

  function handleCardClick(index) {
    if (locked) return;
    if (flipped.includes(index) || matched.includes(index)) return;

    const nextFlipped = [...flipped, index];
    setFlipped(nextFlipped);

    if (nextFlipped.length === 2) {
      setLocked(true);
      setMoves((m) => m + 1);
      const [a, b] = nextFlipped;

      if (cards[a] === cards[b]) {
        setMatched((prev) => [...prev, a, b]);
        setFlipped([]);
        setLocked(false);
      } else {
        setTimeout(() => {
          setMismatch([a, b]);
          setTimeout(() => {
            setMismatch([]);
            setFlipped([]);
            setLocked(false);
          }, 400);
        }, 500);
      }
    }
  }

  const progressPct = Math.max(0, (timeLeft / timeLimit) * 100);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className={`memory-game ${difficultyKey}`}>
      <div className="game-content">
        <div className="game-header">
          <button className="back-button" onClick={() => navigate("/")}>
            ← Back
          </button>
          <span className="difficulty-tag">
            <span className="theme-emoji">{theme.icon}</span>
            {difficultyLabel}
          </span>
          <span className={`timer ${progressPct < 25 ? "timer-low" : ""}`}>
            {minutes}:{seconds}
          </span>
        </div>

        <div className="progress-track">
          <div
            className={`progress-fill ${progressPct < 25 ? "low" : ""}`}
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <div className="game-stats">
          <span>
            {matched.length / 2} / {numOfCards} pairs
          </span>
          <span className="moves">{moves} moves</span>
        </div>

        <div className="card-grid">
          {cards.map((icon, i) => {
            const isFlipped = flipped.includes(i) || matched.includes(i);
            const isMatched = matched.includes(i);
            const isMismatch = mismatch.includes(i);
            return (
              <button
                key={i}
                className={`memory-card ${isFlipped ? "flipped" : ""} ${
                  isMatched ? "matched" : ""
                } ${isMismatch ? "shake" : ""}`}
                onClick={() => handleCardClick(i)}
                disabled={isFlipped}
              >
                <div className="card-inner">
                  <div className="card-back">✦</div>
                  <div className="card-front">
                    <img src={emojiUrl(icon)} alt="" className="card-emoji" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MemoryGame;
