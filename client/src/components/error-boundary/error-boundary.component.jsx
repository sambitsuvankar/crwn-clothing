import React from 'react'

import { ErrorImageOverlay, ErrorImageContainer, ErrorImageText } from './error-boundary.styles'

class ErrorBoundary extends React.Component {
    constructor(){
        super();

        this.state= {
            hasErrored: false
        }
    }

    static getDerivedStateFromError(error){   // What this static lifecycle method does is it essentially catches a error that thrown in any of the children of this 'errorBoundary' Component 

        // Process the Error
        return { hasErrored: true}

    }

    componentDidCatch(error, info) {   // "componentDidCatch()" gives us access to the error and the info related to the error and how it got from 
        console.log(error);
    }

    render(){
        if(this.state.hasErrored){
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl='https://i.imgur.com/yW2W9SC.png'/>
                    <ErrorImageText> Sorry this page is broken </ErrorImageText>
                </ErrorImageOverlay>
            )
        }

        return this.props.children;
    }
};

export default ErrorBoundary;

// In the 'static getDerivedStateFromError' lifeCycle method this thing will Actually get the little error that was thrown if any children inside of this error boundary does throw an error , and then we have to make sure to return from this method an Object representing a new state that we wanna set locally. 
// Now the rest of the component is aware that the error has happened 
// The second lifecycle method we actually have accessed to that let React know that this is a error boundary component is "componentDidCatch()"  