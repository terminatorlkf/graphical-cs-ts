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
import NavigationBar from "./NavigationBar/NavigationBar";
import { Provider } from 'react-redux';
import bfsStore from './redux/BFS/store';

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
          <Provider store={bfsStore}>
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
          </Provider>

        </CurrentPageContext.Provider>
      </IntroExpandedContext.Provider>
    </React.Fragment >
  );
}

export default App;
