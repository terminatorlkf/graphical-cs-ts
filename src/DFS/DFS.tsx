import React from "react";
import IntroSection from '../shared/IntroSection/IntroSection';
import { colorArray } from "../shared/colorArray/colorArray";

const DFS = ()=> {
    return (
        <div>
            <IntroSection title='Depth-First Search' source='Wikipedia' color={colorArray[1]}>
                "Depth-first search (DFS) is an algorithm for traversing or searching tree or graph data structures. 
                The algorithm starts at the root node (selecting some arbitrary node as the root node in the case of a graph) 
                and explores as far as possible along each branch before backtracking."
            </IntroSection>
        </div>
    );
}

export default DFS;