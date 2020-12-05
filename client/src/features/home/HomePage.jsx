import { useState } from "react";
import Page from "../common/Page";
import MemCardsGame from "./MemCardsGame";
import MemResult from "./MemResult";
import SelectAmountCards from "./SelectAmountCards";

const HomePage = () => {
  const [selectedOption, setSelectedOption] = useState(4);
  const [history, setHistory] = useState(null);
  const options = [4, 8, 12];

  const handleOnFinish = (history) => {
    setHistory(history);
  };

  const reset = () => {
    setSelectedOption(null);
    setHistory(null);
  };

  let Content;
  if (history) {
    Content = <MemResult onRetry={reset} history={history} />;
  } else if (selectedOption) {
    Content = (
      <MemCardsGame
        rounds={2}
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
