import React, { useState, useCallback } from 'react';
import BFS from './BFS/BFS'
import DFS from "./DFS/DFS"
import AStar from "./AStar/AStar"
import BeamSearch from "./BeamSearch/BeamSearch"
import IterativeDeepening from "./IterativeDeepening/IterativeDeepening"
import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom";
import { IntroExpandedContext } from './Context/IntroExpandedContext'
import NavigationBar from "./NavigationBar/NavigationBar"

import './App.css';

function App() {

  const [pagesExpanded, setPagesExpanded] = useState([true, true, true, true, true]);

  const setExpanded = useCallback((index: number) => {
    setPagesExpanded(prevState => {
      prevState[index] = !prevState[index];
      return prevState;
    })
  }, [])

  return (
    <React.Fragment>
      <IntroExpandedContext.Provider
        value={{
          pagesExpanded: pagesExpanded,
          setExpanded: setExpanded
        }}>
        <Router>
          <NavigationBar />

          <Switch>
            <Route path="/bfs">
              <BFS />
            </Route>

            <Route path="/dfs">
              <DFS />
            </Route>

            <Route path="/a-star">
              <AStar />
            </Route>

            <Route path="/beam-search">
              <BeamSearch />
            </Route>

            <Route Path="/iterative-deepening">
              <IterativeDeepening />
            </Route>

            <Redirect to="/bfs" />
          </Switch>
        </Router>
      </IntroExpandedContext.Provider>
    </React.Fragment>
  );
}

export default App;
