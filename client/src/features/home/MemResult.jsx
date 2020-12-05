import { Button, Result } from "antd";

const calculateResult = (history) => {
  return { time: 23, score: 223 };
};

const MemResult = ({ history, onRetry }) => {
  const result = calculateResult(history);
  console.log(history, result);

  return (
    <Result
      status="success"
      title="You had 23 out of 23 correct"
      subTitle="Well done you clearly have a good memory"
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
