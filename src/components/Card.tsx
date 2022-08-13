import { CardType } from "../types/Card";
import "./Card.css";

export default function Card({
  card,
  handleClick,
  flipped,
  disabled,
}: {
  card: CardType;
  handleClick: Function;
  flipped: boolean;
  disabled: boolean;
}) {
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card" />
        <img
          className="back"
          src="/img/back.png"
          alt="back"
          onClick={() => {
            if (!disabled) {
              handleClick(card);
            }
          }}
        />
      </div>
    </div>
  );
}
