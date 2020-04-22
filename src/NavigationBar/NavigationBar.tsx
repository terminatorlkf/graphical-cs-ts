/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext, useEffect } from "react";
import { IntroExpandedContext } from "../Context/IntroExpandedContext"
import { Link } from "react-router-dom";
import { Ripple } from "@rmwc/ripple"
import { ThemeProvider } from "@rmwc/theme"

import '@rmwc/ripple/styles';
import "./NavigationBar.css";

interface NavigationBarProps {
    className?: string
}

const NavigationBar: React.FC<NavigationBarProps> = ({ className }) => {

    const [currentPageState, setCurrentPageState] = useState(0);
    const [pageExpanded, setPageExpanded] = useState(true);
    const IntroExpanded = useContext(IntroExpandedContext);


    useEffect(() => {
        if (IntroExpanded) {
            for (let i = 0; i < IntroExpanded.pagesExpanded.length; i++) {
                if (IntroExpanded.pagesExpanded[i] === false) {
                    setPageExpanded(false);
                }
            }
        }
    }, [IntroExpanded, pageExpanded]);


    return (
        <React.Fragment>
            <nav className={`navbar ${className ? className : undefined}`}>
                <div className={!pageExpanded ? "title-secondary" : "title"}>
                    <h1>GRAPHICAL CS</h1>
                </div>

                <div className="navigation-component">
                    <ThemeProvider
                        options={{
                            primary: 'white',
                        }}
                    >
                        <ul className="nav-items">

                            <li className={currentPageState === 0 ? "nav-item-selected" : undefined}>
                                <Link to="/bfs">
                                    <Ripple primary unbounded>
                                        <a onClick={() => setCurrentPageState(0)} className="nav-item">Breadth-First Search</a>
                                    </Ripple>
                                </Link>
                                {/* {currentPageState === 0 && <hr />} */}
                            </li>

                            <li className={currentPageState === 1 ? "nav-item-selected" : undefined}>
                                <Link to="/dfs">
                                    <Ripple primary unbounded>
                                        <a onClick={() => setCurrentPageState(1)} className="nav-item">Depth-First Search</a>
                                    </Ripple>
                                </Link>
                                {currentPageState === 1 && <span _ngcontent-yvm-c1="" className="nav-indicator"></span>}
                            </li>

                            <li className={currentPageState === 2 ? "nav-item-selected" : undefined}>
                                <Link to="/iterative-deepening">
                                    <Ripple primary unbounded>
                                        <a onClick={() => setCurrentPageState(2)} className="nav-item">Iterative Deepening</a>
                                    </Ripple>
                                </Link>
                                {currentPageState === 2 && <span _ngcontent-yvm-c1="" className="nav-indicator"></span>}
                            </li>

                            <li className={currentPageState === 3 ? "nav-item-selected" : undefined}>
                                <Link to="/a-star">
                                    <Ripple primary unbounded>
                                        <a onClick={() => setCurrentPageState(3)} className="nav-item">A* Search</a>
                                    </Ripple>
                                </Link>
                                {currentPageState === 3 && <span _ngcontent-yvm-c1="" className="nav-indicator"></span>}
                            </li>

                            <li className={currentPageState === 4 ? "nav-item-selected" : undefined}>
                                <Link to="/beam-search">
                                    <Ripple primary unbounded>
                                        <a onClick={() => setCurrentPageState(4)} className="nav-item">Beam Search</a>
                                    </Ripple>
                                </Link>
                                {currentPageState === 4 && <span _ngcontent-yvm-c1="" className="nav-indicator"></span>}
                            </li>

                        </ul>
                    </ThemeProvider>

                </div>
            </nav>
        </React.Fragment>

    );
}

export default NavigationBar;