/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext, useEffect } from "react";
import { IntroExpandedContext } from "../Context/IntroExpandedContext"
import NavLinkList from "./NavLinkList/NavLinkList";

import '@rmwc/ripple/styles';
import "./NavigationBar.css";

interface NavigationBarProps {
    className?: string
}

const NavigationBar: React.FC<NavigationBarProps> = ({ className }) => {

    const IntroExpanded = useContext(IntroExpandedContext);

    return (
        <React.Fragment>
            <nav className={`navbar ${className && className}`}>
                <div className={!IntroExpanded?.pagesExpanded[0] ? "title-secondary" : "title"}>
                    <h1>GRAPHICAL CS</h1>
                </div>

                <div className="navigation-component">
                    <NavLinkList className="nav-items" />
                </div>
            </nav>
        </React.Fragment>
    );
}

export default NavigationBar;