import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Front from "./pages/front/Front";
import Admin from "./pages/admin/Admin";

const App = () => (
  <Router>
    <Switch>
      <Route path="/admin" component={Admin}></Route>
      <Route path="/" component={Front} />
    </Switch>
  </Router>
);

export default App;
