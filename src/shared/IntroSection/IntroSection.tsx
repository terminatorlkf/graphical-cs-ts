import React, { useState, useContext } from 'react';
import SmoothCollapse from "react-smooth-collapse";
import { IntroExpandedContext } from "../../Context/IntroExpandedContext";
import { ThemeProvider } from "@rmwc/theme";
import { Button } from "@rmwc/button";
import { colorArray } from "../colorArray/colorArray";
import { useLocation } from 'react-router-dom';
import { pageIndex } from '../pageIndex/pageIndex'

import '@rmwc/theme/styles';
import '@rmwc/button/styles';
import './IntroSection.css';

interface IntroSectionInterface {
    title: string,
    source: string
}

const IntroSection: React.FunctionComponent<IntroSectionInterface> = ({ title, source, children }) => {
    const IntroExpanded = useContext(IntroExpandedContext);

    const isOpenedGlobal = IntroExpanded && IntroExpanded.pagesExpanded[0];
    const setIsOpenedGlobal = IntroExpanded && IntroExpanded.setExpanded;
    const [isOpened, setIsOpened] = useState(isOpenedGlobal ? true : false);
    const [collapsedTitleState, setCollapsedTitleState] = useState(isOpenedGlobal ? "" : " intro-section-collapsed");
    const [expandButtonIsMounted, setExpandButtonIsMounted] = useState(isOpenedGlobal ? false : true);

    let color = colorArray[pageIndex.indexOf(useLocation().pathname)];
    if (useLocation().pathname === '/') {
        color = colorArray[3];
    }

    const collapseHandler = () => {
        setIsOpenedGlobal && setIsOpenedGlobal(0);

        setIsOpened((prevState: boolean) => {
            return !prevState;
        });

        if (isOpened) {
            setTimeout(() => {
                setCollapsedTitleState(" intro-section-collapsed");
                setExpandButtonIsMounted(true);
            }, 150);
        } else {
            setExpandButtonIsMounted(false);
            setTimeout(() => {
                setCollapsedTitleState("");
            }, 20);
        }
    }

    if (title === '/') {
        return (
            <div className={"intro-section" + collapsedTitleState} style={{ backgroundColor: color }}>
                <div className="intro-section-content">
                    <div className={"intro-section-content-title" + collapsedTitleState}>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className={"intro-section" + collapsedTitleState} style={{ backgroundColor: color }}>
            <div className="intro-section-content">
                <div className={"intro-section-content-title" + collapsedTitleState}>
                    <h1>{title}</h1>
                </div>


                <SmoothCollapse expanded={isOpened}>
                    <div className="description">
                        <p>
                            {children}
                        </p>

                        <p>--{source}</p>
                    </div>

                    {isOpened &&
                        <div className='collapse-button'>
                            <ThemeProvider
                                options={{
                                    primary: 'white'
                                }} >
                                <Button onClick={collapseHandler} label="start exploring" unelevated />
                            </ThemeProvider>
                        </div>
                    }
                </SmoothCollapse>
            </div>

            {expandButtonIsMounted &&
                <div className='expand-button'>
                    <ThemeProvider
                        options={{
                            primary: 'white'
                        }} >
                        <Button onClick={collapseHandler} label="expand" dense />
                    </ThemeProvider>
                </div>
            }

        </div>
    );
}

export default IntroSection;