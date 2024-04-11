import { useEffect, useState } from "react";
import "../styles/App.css";

function App() {
  const [characters, setCharacters] = useState([]);

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
          const isClicked = false;
          fetchedCharacters.push({ character, image, isClicked });
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
  };

  return (
    <>
      <div>
        <h1>Hello World</h1>
        <button onClick={shuffleCharacters}>SHUFFLE</button>
        <div>
          {characters.map((x, index) => (
            <div className="card" key={index}>
              <img src={x.image} alt={x.character} />
              <p>{x.character}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
