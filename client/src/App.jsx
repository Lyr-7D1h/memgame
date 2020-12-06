import { Route, BrowserRouter, Switch } from "react-router-dom";
import HomePage from "./features/game/HomePage";
import ScoreboardPage from "./features/scoreboard/ScoreboardPage";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/scoreboard">
          <ScoreboardPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
