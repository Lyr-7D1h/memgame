import { useState } from "react";
import Page from "../common/Page";
import MemCardsGame from "./MemCardsGame";
import MemResult from "./MemResult";
import SelectAmountCards from "./SelectAmountCards";

const HomePage = () => {
  const [selectedOption, setSelectedOption] = useState(4);
  const [score, setScore] = useState(null);
  const options = [4, 8, 12];
  const rounds = 1;

  const handleOnFinish = (score) => {
    setScore(score);
  };

  const reset = () => {
    setSelectedOption(null);
    setScore(null);
  };

  let Content;
  if (typeof score === "number") {
    Content = (
      <MemResult
        onRetry={reset}
        rounds={rounds}
        amount={selectedOption}
        score={score}
      />
    );
  } else if (selectedOption) {
    Content = (
      <MemCardsGame
        rounds={rounds}
        seconds={5 * (options.indexOf(selectedOption) + 1)} // increase time depending on option
        onFinish={handleOnFinish}
        amount={selectedOption}
      />
    );
  } else {
    Content = (
      <SelectAmountCards options={options} onClick={setSelectedOption} />
    );
  }

  return <Page>{Content}</Page>;
};

export default HomePage;
