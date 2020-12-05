import { Button, Progress, Result } from "antd";

// Calculate score, percentage and roundsWon
const calculateScore = (results, cardsAmount, roundsTotal) => {
  let score = 0;
  let roundsWon = 0;
  for (const result of results) {
    let amountResultCorrect = 0;
    for (const status of result) {
      if (status === "correct") {
        amountResultCorrect += 1;
      }
    }

    // If full correct add 100 points
    if (amountResultCorrect === cardsAmount) {
      roundsWon += 1;
      score += 100;
    } else {
      // If partially correct exponentially shrink 100 points
      score += Math.floor(100 / 2 ** (cardsAmount - amountResultCorrect));
    }
  }

  const percentage =
    roundsWon > 0 ? Math.floor((roundsWon / roundsTotal) * 100) : 0;

  return { roundsWon, percentage, score };
};

const MemResult = ({
  results,
  rounds: roundsTotal,
  amount: cardsAmount,
  onRetry,
}) => {
  const score = calculateScore(results, cardsAmount, roundsTotal);

  const ResultProgress = <Progress type="circle" percent={score.percentage} />;

  let feedback;
  if (score.percentage > 80) {
    feedback = "Wow you must have a very big brain!";
  } else if (score.percentage > 60) {
    feedback = "I guess this will do.";
  } else if (score.percentage > 20) {
    feedback = "Well atleast you tried...";
  } else {
    feedback = "Not really ";
  }

  return (
    <Result
      status="success"
      icon={ResultProgress}
      title={
        <>
          You had {score.roundsWon} out of {roundsTotal} correct.
          <br />
          With a total Score of: {score.score}
        </>
      }
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
