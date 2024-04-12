import { useState } from "react";
import "../styles/Card.css";

export default function Card({
  character,
  handleClick,
  increaseScore,
  updateBestScore,
  resetGame,
}) {
  const [isClicked, setIsClicked] = useState(false);

  function handleCardClick() {
    if (isClicked) {
      updateBestScore();
      alert(`Game over, you already picked ${character.character}`);
      resetGame();
    } else {
      setIsClicked(true);
      handleClick();
      increaseScore();
    }
  }

  return (
    <div className="card" onClick={handleCardClick}>
      <img src={character.image} alt={character.character} />
      <p>{character.character}</p>
    </div>
  );
}
