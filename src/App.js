import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Child from "./Child";
import config from "./config";

function App() {
  return (
    <Router>
      <div className="container">
        <ul>
          {config.headers.map(header => (
            <li key={header}>
              <Link to={`/${header}`}>{header}</Link>
            </li>
          ))}
        </ul>

        <Route exact path="/:id" component={Child} />
      </div>
    </Router>
  );
}

export default App;
