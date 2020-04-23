/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext } from "react";
import { IntroExpandedContext } from "../Context/IntroExpandedContext"
import NavLinkList from "./NavLinkList/NavLinkList";

import '@rmwc/ripple/styles';
import "./NavigationBar.css";

interface NavigationBarProps {
    className?: string
}

const NavigationBar: React.FC<NavigationBarProps> = ({ className }) => {

    const [state, setState] = useState(0);

    const IntroExpanded = useContext(IntroExpandedContext);
    const titleClass = !IntroExpanded?.pagesExpanded[0] ? "title-secondary" : "title";
    console.log(titleClass);

    return (
        <React.Fragment>
            <nav className='navbar'>
                <div className={titleClass}>
                    <h1>GRAPHICAL CS</h1>
                </div>

            {/* <button onClick={()=> {setState(Math.random())}}>force re-render</button> */}
                <div className="navigation-component">
                    <NavLinkList className="nav-items" />
                </div>
            </nav>
        </React.Fragment>
    );
}

export default NavigationBar;