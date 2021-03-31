import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

// NOTE :- What 'css' from 'styled-components' does is it allows us to write a block of css that we can pass in and render inside any od our styled components

const OptionContainerStyles = css`
        padding: 10px 15px;
        cursor: pointer;
`;

export const HeaderContainer = styled.div`
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
    
    @media screen and (max-width: 800px){
        padding: 10px;
        height: 60px;
        margin-bottom: 20px;
    }
`;

export const LogoContainer = styled(Link)`
    height: 100%;
    width: 70px;
    padding: 25px;

    @media screen and (max-width: 800px){
        padding: 0 0 0 2.5%;
        width: 50px;
        margin-bottom: 20px;
    }
`;

export const OptionsContainer = styled.div`
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        @media screen and (max-width: 800px){
            width: 80%;
        }
`;

export const OptionLink = styled(Link)`
    ${OptionContainerStyles}
`;

export const OptionDiv = styled.div`
    ${OptionContainerStyles}
`;