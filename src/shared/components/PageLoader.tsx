import React from 'react';
import styled from 'styled-components';
import { Loader } from './Loader';

const PageLoaderStyled = styled.div`    
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99;
`;

export const PageLoader = () => {
    return (
        <React.Fragment>
            <PageLoaderStyled><Loader /></PageLoaderStyled>
        </React.Fragment>
    );
};