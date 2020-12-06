import { Button, Input, Result } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import errorHandler from "../utils/errorHandler";
import requester from "../utils/requester";

const SaveToScoreboard = ({ score, cardCount, onRetry }) => {
  const [username, setUsername] = useState("");
  const [toScoreboard, setToScoreboard] = useState(false);
  const [error, setError] = useState("");

  const save = () => {
    if (username.length > 30) {
      setError("Username too big");
    } else if (username.length === 0) {
      setError("Please fill in a username");
    } else {
      requester
        .post("scoreboard", { score, username, cardCount })
        .then(() => {
          setToScoreboard(true);
        })
        .catch(errorHandler);
    }
  };

  const UsernameInput = (
    <Input
      onChange={(e) => setUsername(e.target.value)}
      size="large"
      style={{ width: "30vw" }}
      onPressEnter={save}
      placeholder="Username"
    />
  );

  if (toScoreboard) {
    return <Redirect to="scoreboard" />;
  }

  return (
    <Result
      style={{ marginTop: "40px" }}
      icon={<Title>Score: {score}</Title>}
      title={UsernameInput}
      subTitle={<Text type="danger">{error}</Text>}
      extra={[
        <Button size="large" onClick={save} type="primary" key="save">
          Save
        </Button>,
        <Button size="large" onClick={onRetry} key="again">
          Back to menu
        </Button>,
      ]}
    />
  );
};

export default SaveToScoreboard;
