import { useState } from "react";

export default function Card({
  character,
  handleClick,
  increaseScore,
  updateBestScore,
}) {
  const [isClicked, setIsClicked] = useState(false);

  function handleCardClick() {
    console.log(isClicked);
    if (isClicked) {
      console.log("you lost " + isClicked);
      updateBestScore();
    } else {
      console.log("This: " + isClicked);
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
