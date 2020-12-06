import { Button, Progress, Result } from "antd";
import { useState } from "react";
import SaveToScoreboard from "./SaveToScoreboard";

const MemResult = ({ score, rounds, cardCount, onRetry }) => {
  const [showSave, setShowSave] = useState(false);

  // percentage current score devided by total score (max 100 per round)
  const percentage = Math.floor((score / (rounds * 100)) * 100);
  const ResultProgress = (
    <Progress status="normal" type="circle" percent={percentage} />
  );

  let feedback;
  if (percentage > 80) {
    feedback = "Wow you must have a very big brain!";
  } else if (percentage > 60) {
    feedback = "I guess this will do.";
  } else if (percentage > 20) {
    feedback = "Well atleast you tried...";
  } else {
    feedback = "Not really sure if this is something for you..";
  }

  if (showSave) {
    return (
      <SaveToScoreboard cardCount={cardCount} score={score} onRetry={onRetry} />
    );
  }

  return (
    <Result
      style={{ marginTop: "40px" }}
      icon={ResultProgress}
      title={<>Total Score: {score}</>}
      subTitle={feedback}
      extra={[
        <Button
          onClick={() => setShowSave(true)}
          size="large"
          type="primary"
          key="scoreboard"
        >
          Save To Scoreboard
        </Button>,
        <Button onClick={onRetry} key="again" size="large">
          Back to menu
        </Button>,
      ]}
    />
  );
};

export default MemResult;
