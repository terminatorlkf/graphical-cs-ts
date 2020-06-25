import React, { useState } from 'react';
import { Home } from './pages/Home'
import { BFS } from './pages/BFS'
import { DFS } from "./pages/DFS"
import { AStar } from "./pages/AStar"
import { BeamSearch } from "./pages/BeamSearch"
import { IterativeDeepening } from "./pages/IterativeDeepening"
import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom";
import { IntroExpandedContext } from './Context/IntroExpandedContext'
import { CurrentPageContext } from './Context/CurrentPageContext';
import { NavigationBar } from "./Components/NavigationBar";

import './App.css';

function App() {

  const [pagesExpanded, setPagesExpanded] = useState([false, true, true, true, true]);
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

              <Route path="/" exact>
                <Redirect to="/home" />
              </Route>

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
    </React.Fragment >
  );
}

export default App;
