import React from "react";
import { IntroSection } from '../../components/IntroSection';

export const DFS = ()=> {
    return (
        <div>
            <IntroSection title='Depth-First Search' source='Wikipedia'>
                "Depth-first search (DFS) is an algorithm for traversing or searching tree or graph data structures. 
                The algorithm starts at the root node (selecting some arbitrary node as the root node in the case of a graph) 
                and explores as far as possible along each branch before backtracking."
            </IntroSection>
        </div>
    );
}
