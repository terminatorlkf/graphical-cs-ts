import React, { FunctionComponent} from "react";
import IntroSection from '../shared/IntroSection/IntroSection';

const Home: FunctionComponent = () => {
    return (
        <div>
            <IntroSection title = '/' source = '/'>
                Nothing to say
            </IntroSection>
        </div>
    )
}

export default Home;