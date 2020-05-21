import React, { FunctionComponent } from "react";
import HomeBackground from "./HomeBackground";

import './Home.css';

const Home: FunctionComponent = () => {
    return (
        <React.Fragment>
            <HomeBackground />
            <div>
                <h1 className="title-welcome"> Welcome </h1>
                <h2 className='title-secondary'>
                    We're committed to building technology that helps people find ways to be together.
            </h2>
            </div>
        </React.Fragment>
    )
}

export default Home;