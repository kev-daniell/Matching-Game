import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import { CardType } from "./types/Card";

const cardImages = [
  { src: "/img/bb8.png", display: false },
  { src: "/img/mando.png", display: false },
  { src: "/img/kylo.png", display: false },
  { src: "/img/luke.png", display: false },
  { src: "/img/trooper.png", display: false },
  { src: "/img/yoda.png", display: false },
];

function App() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [turns, setTurns] = useState(0);
  const [cardOne, setCardOne] = useState<CardType | null>(null);
  const [cardTwo, setCardTwo] = useState<CardType | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [highScore, setHighScore] = useState<number | null>(null);

  const Shuffle = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.round(Math.random() * 100000000) }));

    setCards(shuffledCards);
    setCardOne(null);
    setCardTwo(null);
    setTurns(0);
  };

  const ClickCard = (card: CardType) => {
    if (!cardOne && !cardTwo) setCardOne(card);
    else if (cardOne && !cardTwo && cardOne.id !== card.id) {
      setCardTwo(card);
    }
  };

  // check match
  useEffect(() => {
    if (cardOne && cardTwo) {
      setDisabled(true);
      if (cardOne.src === cardTwo.src) {
        setCards((prevCards) =>
          prevCards.map((card: CardType) => {
            if (card.src === cardOne.src) {
              return { ...card, display: true };
            } else return card;
          })
        );
        setTurns((prevTurns) => prevTurns + 1);
        setTimeout(() => resetTurn(), 1000);
      } else {
        setTurns((prevTurns) => prevTurns + 1);
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [cardOne, cardTwo]);

  useEffect(() => {
    // check if game is over:
    for (let i = 0; i < cards.length; i++) {
      if (!cards[i].display) {
        return;
      }
    }

    if (turns < (highScore ?? 0) || (turns > 0 && highScore === null)) {
      setHighScore(turns);
    }
  }, [cards, highScore, turns]);

  // reset choices & increase turn
  const resetTurn = () => {
    setCardOne(null);
    setCardTwo(null);
    setDisabled(false);
  };

  // shuffle on user load
  useEffect(() => {
    Shuffle();
  }, []);

  return (
    <div className="App">
      <h1 style={{ marginBottom: "1rem" }}>Star Wars Match</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "0%",
        }}
      >
        <button onClick={Shuffle}>New Game</button>
        <p>Turns: {turns}</p>
      </div>
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleClick={ClickCard}
            flipped={
              card.display || card.id === cardOne?.id || card.id === cardTwo?.id
            }
            disabled={disabled}
          />
        ))}
      </div>
      <div>
        <p>High Score: {highScore && highScore}</p>
      </div>
    </div>
  );
}

export default App;
