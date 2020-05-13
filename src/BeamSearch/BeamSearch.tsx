import React from "react";
import IntroSection from '../shared/IntroSection/IntroSection';
import { colorArray } from "../shared/colorArray/colorArray";

const BeamSearch = ()=> {
    return (
        <div>
            <IntroSection title='Beam Search' source='Wikipedia' color={colorArray[4]}>
                "Beam search is a heuristic search algorithm that explores a graph by expanding the most promising node in a limited set. 
                Beam search is an optimization of best-first search that reduces its memory requirements. Best-first search is a graph 
                search which orders all partial solutions (states) according to some heuristic. But in beam search, only a predetermined number of 
                best partial solutions are kept as candidates. It is thus a greedy algorithm."
            </IntroSection>
        </div>
    );
}

export default BeamSearch;