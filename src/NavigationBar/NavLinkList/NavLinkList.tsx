import React, { FunctionComponent, useState } from 'react';
import NavLink from "../NavLink/NavLink"


interface NavLinkLisProps {
    className: string,
}

const NavLinkList: FunctionComponent<NavLinkLisProps> = ({ className }) => {
    const [currentPageState, setCurrentPageState] = useState(0);

    return (
        <React.Fragment>
            <ul className={className}>
                <NavLink
                    className={currentPageState === 0 ? "nav-item-selected" : ""}
                    onClick={() => setCurrentPageState(0)}
                    text='Breadth-First Search'
                    to="/bfs"
                />
                <NavLink
                    className={currentPageState === 1 ? "nav-item-selected" : ""}
                    onClick={() => setCurrentPageState(1)}
                    text='Depth-First Search'
                    to="/dfs"
                />
                <NavLink
                    className={currentPageState === 2 ? "nav-item-selected" : ""}
                    onClick={() => setCurrentPageState(2)}
                    text='Iterative Deepening'
                    to="/iterative-deepening"
                />
                <NavLink
                    className={currentPageState === 3 ? "nav-item-selected" : ""}
                    onClick={() => setCurrentPageState(3)}
                    text='A* Search'
                    to="/a-star"
                />
                <NavLink
                    className={currentPageState === 4 ? "nav-item-selected" : ""}
                    onClick={() => setCurrentPageState(4)}
                    text='Beam Search'
                    to="/beam-search"
                />
            </ul>
        </React.Fragment>
    );
}

export default NavLinkList;