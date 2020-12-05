import { Route, BrowserRouter, Switch } from "react-router-dom";
import HomePage from "./features/game/HomePage";
import ScoreboardPage from "./features/scoreboard/ScoreboardPage";
import LoginPage from "./features/login/LoginPage";

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
        <Route path="/login">
          <LoginPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
