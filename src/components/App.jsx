import { useEffect, useState } from "react";
import "../styles/App.css";
import Card from "../components/Card";
import uniqid from "uniqid";

function App() {
  const [characters, setCharacters] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    const charactersNames = [
      "mario",
      "peach",
      "luigi",
      "toad",
      "bowser",
      "yoshi",
      "wario",
      "donkey kong",
      "diddy kong",
      "waluigi",
      "daisy",
      "bowser jr.",
      "boo",
    ];
    let isMounted = true;

    const fetchCharacters = async () => {
      const fetchedCharacters = [];
      await Promise.all(
        charactersNames.map(async (characterName) => {
          const response = await fetch(
            `https://www.amiiboapi.com/api/amiibo/?name=${characterName}&type=figure`
          );
          const data = await response.json();
          const firstAmiibo = data.amiibo[0];
          const { character, image } = firstAmiibo;
          const id = uniqid();
          fetchedCharacters.push({ character, image, id });
        })
      );
      if (isMounted) {
        setCharacters(fetchedCharacters);
      }
    };

    fetchCharacters();

    return () => {
      isMounted = false;
    };
  }, []);

  function shuffleArray(array) {
    // Using Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const shuffleCharacters = () => {
    const shuffledArray = shuffleArray([...characters]);
    setCharacters(shuffledArray);
    setCurrentScore((prevScore) => {
      return prevScore + 1;
    });
  };

  return (
    <>
      <div>
        <h1>Hello World</h1>
        <div>curr:{currentScore}</div>
        <div>best:{bestScore}</div>
        <div>
          {characters.map((character) => (
            <Card
              key={character.id}
              character={character}
              handleClick={shuffleCharacters}
            ></Card>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
