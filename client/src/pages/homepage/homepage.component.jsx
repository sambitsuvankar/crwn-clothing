import React, { Profiler } from 'react';
import Directory from '../../components/directory/directory.component';
import './homepage.style.scss';
import { HomepageContainer } from './homepage.styles.jsx'   // Here we imported the styled component which has the CSS properties.

const HomePage = (props) => (
    <HomepageContainer>
        <Profiler id='Directory' onRender={(id, phase, actualDuration) => { console.log({id, phase, actualDuration})} }>
            <Directory />
        </Profiler>
    </HomepageContainer>
)

export default HomePage;