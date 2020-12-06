import { useState } from "react";
import Page from "../common/Page";
import MemCardsGame from "./MemCardsGame";
import MemResult from "./MemResult";
import SelectAmountCards from "./SelectAmountCards";

const HomePage = () => {
  const [selectedCardCount, setSelectedCardCount] = useState(null);
  const [score, setScore] = useState(null);
  const cardCounts = [4, 8, 12];
  const rounds = 1;

  const handleOnFinish = (score) => {
    setScore(score);
  };

  const reset = () => {
    setSelectedCardCount(null);
    setScore(null);
  };

  let Content;
  if (typeof score === "number") {
    Content = (
      <MemResult
        onRetry={reset}
        rounds={rounds}
        cardCount={selectedCardCount}
        score={score}
      />
    );
  } else if (selectedCardCount) {
    Content = (
      <MemCardsGame
        rounds={rounds}
        seconds={5 * (cardCounts.indexOf(selectedCardCount) + 1)} // increase time depending on option
        onFinish={handleOnFinish}
        cardCount={selectedCardCount}
      />
    );
  } else {
    Content = (
      <SelectAmountCards options={cardCounts} onClick={setSelectedCardCount} />
    );
  }

  return <Page>{Content}</Page>;
};

export default HomePage;
