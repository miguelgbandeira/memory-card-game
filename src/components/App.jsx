import { useEffect, useState } from "react";
import "../styles/App.css";

function App() {
  const [characters, setCharacters] = useState([]);
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

  useEffect(() => {
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
          fetchedCharacters.push({ character, image });
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

  return (
    <>
      <div>
        <h1>Hello World</h1>
        <div>
          {characters.map((x, index) => (
            <div key={index}>
              <img src={x.image} alt={x.character} />
              <p>Name: {x.character}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
