import { useState } from "react";
import Page from "../common/Page";
import MemCardsGame from "./MemCardsGame";
import MemResult from "./MemResult";
import SelectAmountCards from "./SelectAmountCards";

const HomePage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [results, setResults] = useState(null);
  const options = [4, 8, 12];
  const rounds = 1;

  const handleOnFinish = (results) => {
    setResults(results);
  };

  const reset = () => {
    setSelectedOption(null);
    setResults(null);
  };

  let Content;
  if (results) {
    Content = (
      <MemResult
        onRetry={reset}
        rounds={rounds}
        amount={selectedOption}
        results={results}
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
