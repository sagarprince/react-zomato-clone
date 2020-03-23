import styled from 'styled-components';
import { Col } from '@bootstrap-styled/v4';

export const RestaurantInfoSection = styled.section`
    padding: 20px 20px 0px;
`;

export const RestaurantTitle = styled.h2`
    font-size: 2.5rem;
    line-height: 1;
    color: rgb(28, 28, 28);
    font-weight: 500;
    margin: 0px;
`;

export const RestaurantCuisines = styled.p`
    font-size: 1.2rem;
    color: rgb(105, 105, 105);
    margin-top: 10px;
    margin-bottom: 10px;
`;

export const RestaurantLocation = styled.div`
    font-size: 1.2rem;
    color: rgb(79, 79, 79);
    font-weight: normal;
`;

export const RestaurantRatingReviewCol = styled(Col)`
    display: flex;
    align-items: center;
`

export const RestaurantRatingReviewWrap = styled.div`    
    margin-left: auto;
    box-shadow: rgba(28, 28, 28, 0.08) 0px 1px 4px;
    width: 5.6rem;
    height: fit-content;
    cursor: pointer;
    margin: 0px 0px 0px auto;
    border-radius: 0.7rem;
`;

export const RestaurantRatings = styled.div`    
    background-color: ${props => '#' + props.color || "green"};
    color: #fff;
    font-size: 2rem;
    font-weight: 500;
    text-align: center;
    height: 3rem;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    border-radius: 0.7rem 0.7rem 0px 0px;
`;

export const RestaurantReview = styled.div`   
    p {
        font-size: 1.2rem;
        line-height: 1.2;
        color: rgb(105, 105, 105);
        text-align: center;
        margin: 0.3rem 0px 0px;
    }
    p + p {
        font-size: 1rem;
        line-height: 1.5;
        color: rgb(181, 181, 181);
        text-align: center;
        margin: 0px 0px 0.2rem;
    }
`;