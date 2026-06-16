// 12 cards - in 3 rows 4 cols

// We can click on 2 buttons to show the values, and if they match then we disable those buttons
// if they do not match, then we reset the buttons on the next click

// show game over if time runs out or if they get all the matches
import { useState, useEffect, useRef } from "react";

function MemoryGame({ numOfCards }) {
  const startingCards = ["Dog", "Cat", "Fish", "Bird", "Snake", "Rabbit"];

  const [cards, setCards] = useState([]);
  const [screenCards, setScreenCards] = useState([]);

  let pickIndex1 = useRef(null);
  let pickIndex2 = useRef(null);

  useEffect(() => {
    const tempCards1 = [];
    const tempCards2 = [];
    const xArr = [];

    for (var i = 0; i < numOfCards; i++) {
      tempCards1.push(startingCards[i]); // D, C, F, B
      tempCards2.push(startingCards[i]); // D, C, F, B
      xArr.push("x");
      xArr.push("x");
    }

    tempCards1.sort(() => Math.random() - 0.5); // C F D
    tempCards2.sort(() => Math.random() - 0.5); // F C D

    setCards([...tempCards1, ...tempCards2]); // C F D F C D
    setScreenCards([...xArr]);
  }, []);

  function handleCardClick(index) {
    if (!pickIndex1.current) {
      pickIndex1.current = index;
    } else if (!pickIndex2.current) {
      pickIndex2.current = index;
    } else {
      pickIndex1.current = null;
      pickIndex2.current = null;
    }

    console.log(pickIndex1);
    console.log(pickIndex2);

    const tempCards = [];
    for (var i = 0; i < numOfCards * 2; i++) {
      tempCards[i] = "X";
      if (i == pickIndex1.current || i == pickIndex2.current) {
        tempCards[i] = cards[i];
      }
    }
    // Call your new function here

    setScreenCards(tempCards);
  }

  // Check the values at pickINdex 1 and 2 from cards

  // if they are the same then we want to tell the code
  // to make those indexes "invalid", create a third state/ref array
  // called inactiveCards, and when we render the buttons to the screen below
  // we add in some code ot make the button disabled and show the text

  // The new array can store null or teh text value of that index

  console.log(cards);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: "200px",
        margin: "2rem",
      }}
    >
      {cards.map((c, i) => (
        <button
          key={`${c}${i}`}
          onClick={(event) => handleCardClick(i)}
          style={{ padding: "1rem" }}
        >
          {screenCards[i]}
        </button>
      ))}
    </div>
  );
}

export default MemoryGame;
