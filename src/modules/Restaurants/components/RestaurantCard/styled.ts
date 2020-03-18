import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const RestaurantCardSection = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 15px;
`;

export const RestaurantThumbLink = styled(Link)`
    white-space: nowrap;
    display: block;
    position: relative;
    height: 11rem;
    width: 100%;
    text-decoration: none;
    border-radius: 0.6rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}
`;

export const RestaurantRatings = styled.div`    
    color: #fff;
    font-size: 1rem;
    border-radius: 6px;
    background-color: ${props => '#' + props.color || "green"};
    color: #fff;
    position: absolute;
    display: flex;
    bottom: 1rem;
    right: 1rem;
    width: 35px;
    height: 28px;
    align-items: center;
    justify-content: center;
`;

export const RestaurantDetails = styled.div`
    max-width: 100%;
    margin: 0.5rem 0px 0rem;
    white-space: nowrap;
`;

export const RestaurantTitle = styled(Link)`
    white-space: nowrap;
    display: block;
    font-size: 1.4rem;
    line-height: 1.5;
    color: rgb(28, 28, 28);
    font-weight: 500;
    text-decoration: none;
    text-overflow: ellipsis;
    overflow: hidden;
`;

export const RestaurantLocation = styled.div`
    white-space: nowrap;
    display: block;
    font-size: 1.1rem;
    line-height: 1.5;
    color: rgb(79, 79, 79);
    font-weight: normal;
    text-decoration: none;
    text-overflow: ellipsis;
    overflow: hidden;
`;

export const RestaurantCuisine = styled.div`
    font-size: 0.9rem;
    margin-top: 0.3rem;
    max-width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
`;