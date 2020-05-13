import React, { useState } from 'react';
import Home from './Home/Home'
import BFS from './BFS/BFS'
import DFS from "./DFS/DFS"
import AStar from "./AStar/AStar"
import BeamSearch from "./BeamSearch/BeamSearch"
import IterativeDeepening from "./IterativeDeepening/IterativeDeepening"
import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom";
import { IntroExpandedContext } from './Context/IntroExpandedContext'
import { CurrentPageContext } from './Context/CurrentPageContext';
import NavigationBar from "./NavigationBar/NavigationBar"

import './App.css';

function App() {

  const [pagesExpanded, setPagesExpanded] = useState([true, true, true, true, true]);
  const [currentPage, setCurrentPage] = useState(0);

  const setExpanded = (index: number) => {

    const newExpandedState = [...pagesExpanded];
    let newExpandedValue = !newExpandedState[index];
    newExpandedState[index] = newExpandedValue;

    setPagesExpanded(newExpandedState);
  }

  const setPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  }

  return (
    <React.Fragment>
      <IntroExpandedContext.Provider
        value={{
          pagesExpanded,
          setExpanded
        }}>
        <CurrentPageContext.Provider
          value={{
            currentPage,
            setCurrentPage: setPage
          }}>
          <Router>
            <NavigationBar />
            <Switch>

              <Route path="/home">
                <Home />
              </Route>

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

            </Switch>
          </Router>
        </CurrentPageContext.Provider>
      </IntroExpandedContext.Provider>
    </React.Fragment>
  );
}

export default App;
