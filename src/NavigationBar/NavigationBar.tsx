/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from "react";
import { Redirect } from 'react-router-dom';
import { IntroExpandedContext } from "../Context/IntroExpandedContext"
import NavLinkList from "./NavLinkList/NavLinkList";
import { colorArray } from "../shared/colorArray/colorArray";
import { useLocation } from 'react-router-dom';
import { pageIndex } from '../shared/pageIndex/pageIndex'

import '@rmwc/ripple/styles';
import "./NavigationBar.css";

interface NavigationBarProps {
    className?: string,
}

const NavigationBar: React.FC<NavigationBarProps> = ({ className }) => {
    const [redirect, setRedirect] = useState<boolean>(false);

    let currentPageIndex = pageIndex.indexOf(useLocation().pathname);

    const IntroExpanded = useContext(IntroExpandedContext);

    let titleClass = !IntroExpanded?.pagesExpanded[currentPageIndex - 1] ? "title-secondary" : "title";

    if (currentPageIndex === 0) {
        titleClass = "title";
    }

    const handleClickTitle = () => {
        setRedirect(true);

        setTimeout(() => {
            setRedirect(false);
        }, 0.1);
    }

    return (
        <React.Fragment>
            <nav className='navbar' style={{ backgroundColor: colorArray[currentPageIndex ? currentPageIndex : 0] }}>
                <div className={titleClass}>
                    <h1 onClick={handleClickTitle} style={{cursor: "pointer"}}>GRAPHICAL CS</h1>
                </div>

                {redirect && 
                <Redirect to='home' />}

                <div className="navigation-component">
                    <NavLinkList className="nav-items" />
                </div>
            </nav>
        </React.Fragment>
    );
}


export default NavigationBar;