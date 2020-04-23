import React, { FunctionComponent, useState, useContext } from 'react';
import NavLink from "../NavLink/NavLink"
import { CurrentPageContext } from '../../Context/CurrentPageContext';

interface NavLinkLisProps {
    className: string,
}

const NavLinkList: FunctionComponent<NavLinkLisProps> = ({ className }) => {
    const [currentPageState, setCurrentPageState] = useState(0);
    const currentPage = useContext(CurrentPageContext);

    const navLinkClickHandler = (index: number) => {
        setCurrentPageState(index)
        currentPage && currentPage.setCurrentPage(index);
    }

    return (
        <React.Fragment>
            <ul className={className}>
                <NavLink
                    className={currentPageState === 0 ? "nav-item-selected" : ""}
                    onClick={() => navLinkClickHandler(0)}
                    text='Breadth-First Search'
                    to="/bfs"
                />
                <NavLink
                    className={currentPageState === 1 ? "nav-item-selected" : ""}
                    onClick={() => navLinkClickHandler(1)}
                    text='Depth-First Search'
                    to="/dfs"
                />
                <NavLink
                    className={currentPageState === 2 ? "nav-item-selected" : ""}
                    onClick={() => navLinkClickHandler(2)}
                    text='Iterative Deepening'
                    to="/iterative-deepening"
                />
                <NavLink
                    className={currentPageState === 3 ? "nav-item-selected" : ""}
                    onClick={() => navLinkClickHandler(3)}
                    text='A* Search'
                    to="/a-star"
                />
                <NavLink
                    className={currentPageState === 4 ? "nav-item-selected" : ""}
                    onClick={() => navLinkClickHandler(4)}
                    text='Beam Search'
                    to="/beam-search"
                />
            </ul>
        </React.Fragment>
    );
}

export default NavLinkList;