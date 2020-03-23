import React from 'react';
import { Row, Col } from '@bootstrap-styled/v4';
import { Location, Rating } from '../../../../store/restaurants';
import {
    RestaurantInfoSection, RestaurantTitle, RestaurantCuisines, RestaurantLocation,
    RestaurantRatingReviewCol, RestaurantRatingReviewWrap, RestaurantRatings, RestaurantReview
} from './styled';

export const RestaurantInfo = React.memo((props:
    { name: string; cuisines: string; location: Location; rating: Rating; totalReviews: number }
) => {
    return (
        <React.Fragment>
            <RestaurantInfoSection>
                <Row>
                    <Col lg={8} md={8} sm={8} xs={8}>
                        <RestaurantTitle>{props.name}</RestaurantTitle>
                        <RestaurantCuisines>{props.cuisines}</RestaurantCuisines>
                        <RestaurantLocation title={props.location.locality_verbose}>{props.location.locality_verbose}</RestaurantLocation>
                    </Col>
                    <RestaurantRatingReviewCol lg={4} md={4} sm={4} xs={4}>
                        <RestaurantRatingReviewWrap>
                            <RestaurantRatings
                                color={props.rating.rating_color}>{props.rating.aggregate_rating}</RestaurantRatings>
                            <RestaurantReview>
                                <p>{props.totalReviews}</p>
                                <p>Reviews</p>
                            </RestaurantReview>
                        </RestaurantRatingReviewWrap>
                    </RestaurantRatingReviewCol>
                </Row>
            </RestaurantInfoSection>
        </React.Fragment>
    );
});