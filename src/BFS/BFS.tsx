import React, { FunctionComponent, useState, useContext } from "react";
import { Fab } from "@rmwc/fab";
import { Elevation } from "@rmwc/elevation";
import { ThemeProvider } from "@rmwc/theme";
import { Button } from "@rmwc/button";
import SmoothCollapse from "react-smooth-collapse";
import { IntroExpandedContext } from "../Context/IntroExpandedContext";
import AddNodeButton from "./AddNodeButton"

import '@rmwc/theme/styles';
import '@rmwc/fab/styles';
import '@rmwc/icon/styles';
import '@rmwc/tooltip/styles';
import '@rmwc/button/styles';
import '@rmwc/elevation/styles';
import './BFS.css'

const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * Math.floor(max));
}

const BFS: FunctionComponent = () => {
    const IntroExpanded = useContext(IntroExpandedContext);

    // const [isOpenedGlobal, setIsOpenedGlobal] = IntroExpanded && IntroExpanded;

    const isOpenedGlobal = IntroExpanded && IntroExpanded.pagesExpanded[0];
    const setIsOpenedGlobal = IntroExpanded && IntroExpanded.setExpanded;

    const [nodeListState, setNodeListState] = useState<number[]>([]);
    const [isOpened, setIsOpened] = useState(isOpenedGlobal ? true : false);
    const [collapsedTitleState, setCollapsedTitleState] = useState(isOpenedGlobal ? "" : " intro-section-collapsed");

    const collapseHandler = () => {
        setIsOpenedGlobal && setIsOpenedGlobal(0);

        setIsOpened((prevState: boolean) => {
            return !prevState;
        });

        if (isOpened) {
            setTimeout(() => {
                setCollapsedTitleState(" intro-section-collapsed");
            }, 150);
        } else {
            setTimeout(() => {
                setCollapsedTitleState("");
            }, 20);
        }

    }

    const addNodeHandler = () => {
        setNodeListState(prevState => {
            return [...prevState, getRandomInt(100)]
        });
    }

    return (
        <div style={{ width: "101%" }}>
            <div className={"intro-section" + collapsedTitleState}>
                <div className="intro-section-content">
                    <div className={"intro-section-content-title" + collapsedTitleState}>
                        <h1>Breadth-First Search</h1>
                    </div>


                    <SmoothCollapse expanded={isOpened}>
                        <div className="description">
                            <p>
                                "Breadth-first search (BFS) is an algorithm for traversing or searching tree or graph data structures. It starts at the tree root (or some arbitrary node of a graph,
                                sometimes referred to as a 'search key'), and explores all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level.
                                It uses the opposite strategy as depth-first search, which instead explores the node branch as far as possible before being forced to backtrack and expand other nodes."
                            </p>

                            <p>--Wikipedia</p>
                        </div>
                    </SmoothCollapse>

                </div>
            </div>

            <div className="collapse-button">
                <ThemeProvider
                    options={{
                        primary: 'black'
                    }} >
                    <Button onClick={collapseHandler} label={isOpened ? "collapse" : "expand"} outlined />
                </ThemeProvider>
            </div>

            <div className="operation-section">

                <div className="operation-node-section">
                    {nodeListState.map((value, index) => {
                        return (
                            <Elevation className="operation-node" z={3} key={index}><p>{value}</p></Elevation>
                        )
                    })}
                </div>


                <div className="add-node-button">
                    <AddNodeButton onClick={addNodeHandler} />
                </div>
            </div>
        </div>
    );
}

export default BFS;