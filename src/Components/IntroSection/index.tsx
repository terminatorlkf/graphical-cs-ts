import React, { useState, useContext } from 'react';
import SmoothCollapse from "react-smooth-collapse";
import { IntroExpandedContext } from "../../Context/IntroExpandedContext";
import { ThemeProvider } from "@rmwc/theme";
import { Button } from "@rmwc/button";
import { colorArray } from "../../shared/colorArray/colorArray";
import { useLocation } from 'react-router-dom';
import { pageIndex } from '../../shared/pageIndex/pageIndex'
import { IIntroSection } from './IntroSection';

import '@rmwc/theme/styles';
import '@rmwc/button/styles';
import './IntroSection.css';

export const IntroSection: React.FunctionComponent<IIntroSection.IProps> = ({ title, source, children }) => {
    const IntroExpanded = useContext(IntroExpandedContext);
    const currentPageIndex = pageIndex.indexOf(useLocation().pathname);

    const isOpenedGlobal = IntroExpanded && IntroExpanded.pagesExpanded[currentPageIndex - 1];
    const setIsOpenedGlobal = IntroExpanded && IntroExpanded.setExpanded;
    const [isOpened, setIsOpened] = useState(isOpenedGlobal ? true : false);
    const [collapsedTitleState, setCollapsedTitleState] = useState(isOpenedGlobal ? "" : " intro-section-collapsed");
    const [expandButtonIsMounted, setExpandButtonIsMounted] = useState(isOpenedGlobal ? false : true);

    let color = colorArray[pageIndex.indexOf(useLocation().pathname)];

    const collapseHandler = () => {
        setIsOpenedGlobal && setIsOpenedGlobal(currentPageIndex - 1);

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
                        <hr style={{ opacity: 0 }} />
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
