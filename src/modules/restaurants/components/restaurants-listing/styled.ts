import styled from 'styled-components';
import { Container, Row } from '@bootstrap-styled/v4';

export const RestaurantsListingSection = styled.section`
    position: relative;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 93px);
    overflow: auto;
    padding: 20px 0px;
`;

export const RestaurantsListingLoading = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.35);
    color: #fff;
    z-index: 99;
    h3 {
        margin: 0px;
    }
`;

export const RestaurantsNotFound = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #222;
    img {
        width: 70px;
    }
    h3 {
        margin: 10px 0px 0px;
    }
`;

export const RestaurantsListingContainer = styled(Container)`
    @media(min-width: 0px) and (max-width: 480px) {
        padding-left: 0px;
        padding-right: 0px;
    }
`;

export const RestaurantsListingRow = styled(Row)`
    @media(min-width: 0px) and (max-width: 480px) {
        margin-left: 0px !important;
        margin-right: 0px !important;
    }
`;

export const RestaurantsListingLoadMore = styled.div`
    margin-top: 15px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    button {
        cursor: pointer;
        background-color: #333;
        border: 0 none;
        width: 110px;
        height: 45px;
        font-size: 16px;
        font-family: "Fira Sans Condensed",sans-serif;
        color: #fff;
        font-weight: 500;
        outline: none;
    }
`;