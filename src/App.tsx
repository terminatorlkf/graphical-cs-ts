import React, { useState } from 'react';
import { BFS } from './pages/BFS'
import { DFS } from "./pages/DFS"
import { AStar } from "./pages/AStar"
import { BeamSearch } from "./pages/BeamSearch"
import { IterativeDeepening } from "./pages/IterativeDeepening"
import { Route, Switch, Redirect } from "react-router-dom";
import { IntroExpandedContext } from './Context/IntroExpandedContext'
import { CurrentPageContext } from './Context/CurrentPageContext';
import { NavigationBar } from "./Components/NavigationBar";

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
          <NavigationBar />
          <Switch>
            <Route path="/" exact>
              <Redirect to="/bfs" />
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

            <Route path="/iterative-deepening">
              <IterativeDeepening />
            </Route>
          </Switch>
        </CurrentPageContext.Provider>
      </IntroExpandedContext.Provider>
    </React.Fragment >
  );
}

export default App;
