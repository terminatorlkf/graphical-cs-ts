import React from "react";
import IntroSection from '../../shared/IntroSection/IntroSection';

const IterativeDeepening = ()=> {
    return (
        <div>
            <IntroSection title='Iterative Deepening' source='Wikipedia'>
                "Iterative deepening search or more specifically iterative deepening depth-first search (IDS or IDDFS) 
                is a state space/graph search strategy in which a depth-limited version of depth-first search is run repeatedly 
                with increasing depth limits until the goal is found. IDDFS is optimal like breadth-first search, but uses much 
                less memory; at each iteration, it visits the nodes in the search tree in the same order as depth-first search, 
                but the cumulative order in which nodes are first visited is effectively breadth-first."
            </IntroSection>
        </div>
    );
}

export default IterativeDeepening;