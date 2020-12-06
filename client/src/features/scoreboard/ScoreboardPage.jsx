import { useEffect, useState } from "react";
import Page from "../common/Page";
import requester from "../utils/requester";
import errorHandler from "../utils/errorHandler";

const ScoreboardPage = () => {
  const [scoreboard, setScoreboard] = useState(null);

  useEffect(() => {
    requester
      .get("scoreboard")
      .then((scoreboard) => {
        setScoreboard(scoreboard);
      })
      .catch(errorHandler);
  }, []);

  return <Page></Page>;
};

export default ScoreboardPage;
