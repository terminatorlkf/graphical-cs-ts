import React from "react";
<<<<<<< Updated upstream
=======
import IntroSection from '../shared/IntroSection/IntroSection';
>>>>>>> Stashed changes

const BeamSearch = ()=> {
    return (
        <div>
<<<<<<< Updated upstream
            <h1>Beam Search</h1>
=======
            <IntroSection title='Beam Search' source='Wikipedia'>
                "Beam search is a heuristic search algorithm that explores a graph by expanding the most promising node in a limited set. 
                Beam search is an optimization of best-first search that reduces its memory requirements. Best-first search is a graph 
                search which orders all partial solutions (states) according to some heuristic. But in beam search, only a predetermined number of 
                best partial solutions are kept as candidates. It is thus a greedy algorithm."
            </IntroSection>
>>>>>>> Stashed changes
        </div>
    );
}

export default BeamSearch;