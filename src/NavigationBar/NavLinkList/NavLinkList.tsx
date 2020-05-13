import React, { FunctionComponent, useState } from 'react';
import NavLink from "../NavLink/NavLink"
import { useLocation } from 'react-router-dom';
import { pageIndex } from '../../shared/pageIndex/pageIndex';

interface NavLinkLisProps {
    className: string,
}

const NavLinkList: FunctionComponent<NavLinkLisProps> = ({ className }) => {
    let currentPageIndex = pageIndex.indexOf(useLocation().pathname);

    const [currentPageState, setCurrentPageState] = useState(currentPageIndex);

    const navLinkClickHandler = (index: number) => {
        setCurrentPageState(index);
    }

    return (
        <React.Fragment>
            <ul className={className}>
                <NavLink
                    className={currentPageState === 1 ? "nav-item-selected" : ""}
                    onClick={() => navLinkClickHandler(1)}
                    text='Breadth-First Search'
                    to="/bfs"
                />
                <NavLink
                    className={currentPageState === 2 ? "nav-item-selected" : ""}
                    onClick={() => navLinkClickHandler(2)}
                    text='Depth-First Search'
                    to="/dfs"
                />
                <NavLink
                    className={currentPageState === 3 ? "nav-item-selected" : ""}
                    onClick={() => navLinkClickHandler(3)}
                    text='Iterative Deepening'
                    to="/iterative-deepening"
                />
                <NavLink
                    className={currentPageState === 4 ? "nav-item-selected" : ""}
                    onClick={() => navLinkClickHandler(4)}
                    text='A* Search'
                    to="/a-star"
                />
                <NavLink
                    className={currentPageState === 5 ? "nav-item-selected" : ""}
                    onClick={() => navLinkClickHandler(5)}
                    text='Beam Search'
                    to="/beam-search"
                />
            </ul>
        </React.Fragment>
    );
}

export default NavLinkList;