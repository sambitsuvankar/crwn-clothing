import React from 'react';
import Directory from '../../components/directory/directory.component';
import './homepage.style.scss';
import { HomepageContainer } from './homepage.styles.jsx'   // Here we imported the styled component which has the CSS properties.

const HomePage = (props) => (
    <HomepageContainer>
        <Directory />
    </HomepageContainer>
)

export default HomePage;