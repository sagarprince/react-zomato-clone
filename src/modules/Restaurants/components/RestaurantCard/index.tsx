import React from 'react';
import { Restaurant } from '../../../../store/restaurants';
import { RestuarantThumb } from '../RestuarantThumb';
import {
    RestaurantCardSection, RestaurantThumbLink, RestaurantDetails, RestaurantTitle,
    RestaurantLocation, RestaurantCuisine, RestaurantRatings
} from './styled';

interface Props {
    restaurant: Restaurant
}

class RestaurantCardComponent extends React.PureComponent<Props, {}> {
    
    public render() {
        const r = this.props.restaurant;
        return (
            <RestaurantCardSection>
                <RestaurantThumbLink to={`details/${r.id}`}>
                    <RestuarantThumb restaurant={r} />
                    <RestaurantRatings color={r.user_rating.rating_color}>
                        {r.user_rating.aggregate_rating}
                    </RestaurantRatings>
                </RestaurantThumbLink>
                <RestaurantDetails>
                    <RestaurantTitle to={`details/${r.id}`} title={r.name}>{r.name}</RestaurantTitle>
                    <RestaurantLocation title={r.location.locality_verbose}>{r.location.locality_verbose}</RestaurantLocation>
                    <RestaurantCuisine title={r.cuisines}>{r.cuisines}</RestaurantCuisine>
                </RestaurantDetails>
            </RestaurantCardSection>
        );
    }
}

export default React.memo(RestaurantCardComponent);