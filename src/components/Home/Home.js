import "./Home.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICON_SETS } from "../utils/iconSets";

function Home() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("animals");

  function goToGame(difficulty) {
    navigate(`/game/${difficulty}`, { state: { theme } });
  }

  return (
    <div className="home-page d-flex flex-column align-items-center justify-content-center text-center">
      <div className="home-page-title d-flex flex-column align-items-center mb-5">
        <span className="home-icon mb-3">🃏</span>
        <h1 className="home-title mb-2">Memory Match</h1>
        <p className="home-subtitle mb-0">
          Flip cards, find pairs, beat the clock
        </p>
      </div>

      <div className="theme-section mb-5">
        <p className="theme-section-label">Card Theme</p>
        <div className="theme-options d-flex gap-3">
          {Object.entries(ICON_SETS).map(([key, set]) => (
            <button
              key={key}
              className={`theme-card ${theme === key ? "selected" : ""}`}
              onClick={() => setTheme(key)}
            >
              <span className="theme-card-icon">{set.icon}</span>
              <span className="theme-card-name">{set.label}</span>
              <span className="theme-card-desc">{set.description}</span>
            </button>
          ))}
        </div>
        <div className="theme-preview">
          {ICON_SETS[theme].icons.slice(0, 8).map((icon, i) => (
            <span key={i} className="theme-preview-icon">
              {icon}
            </span>
          ))}
          <span className="theme-preview-more">...</span>
        </div>
      </div>

      <div className="home-page-buttons d-flex flex-column gap-3 w-100">
        <button
          onClick={() => goToGame("easy")}
          className="difficulty-button easy-button d-flex align-items-center justify-content-between w-100"
        >
          <span className="d-flex flex-column align-items-start text-start">
            <span className="difficulty-label easy-label">Easy</span>
            <span className="difficulty-meta">
              12 cards &middot; 60 seconds
            </span>
          </span>
          <span className="difficulty-icon">🌱</span>
        </button>

        <button
          onClick={() => goToGame("medium")}
          className="difficulty-button medium-button d-flex align-items-center justify-content-between w-100"
        >
          <span className="d-flex flex-column align-items-start text-start">
            <span className="difficulty-label medium-label">Medium</span>
            <span className="difficulty-meta">
              20 cards &middot; 90 seconds
            </span>
          </span>
          <span className="difficulty-icon">🔥</span>
        </button>

        <button
          onClick={() => goToGame("hard")}
          className="difficulty-button hard-button d-flex align-items-center justify-content-between w-100"
        >
          <span className="d-flex flex-column align-items-start text-start">
            <span className="difficulty-label hard-label">Hard</span>
            <span className="difficulty-meta">
              36 cards &middot; 120 seconds
            </span>
          </span>
          <span className="difficulty-icon">💀</span>
        </button>
      </div>

      <div className="home-page-caption mt-5">
        Match all pairs before time runs out
      </div>
    </div>
  );
}

export default Home;
