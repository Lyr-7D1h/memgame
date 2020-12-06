import { Button, Progress, Result } from "antd";

const MemResult = ({ score, rounds, onRetry }) => {
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

  return (
    <Result
      style={{ marginTop: "40px" }}
      icon={ResultProgress}
      title={<>Total Score: {score}</>}
      subTitle={feedback}
      extra={[
        <Button type="primary" key="scoreboard">
          Save To Scoreboard
        </Button>,
        <Button onClick={onRetry} key="again">
          Back to menu
        </Button>,
      ]}
    />
  );
};

export default MemResult;
