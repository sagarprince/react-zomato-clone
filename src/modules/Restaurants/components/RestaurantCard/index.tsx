import React from 'react';
import { Restaurant } from '../../../../store/restaurants';
import restaurantIcon from '../../../../assets/images/restaurant_icon.png';
import {
    RestaurantCardSection, RestaurantThumbLink,
    RestaurantThumbImg, RestaurantDefaultThumbImg, RestaurantDetails, RestaurantTitle,
    RestaurantLocation, RestaurantCuisine,
    RestaurantThumbImgOverlay, RestaurantRatings
} from './styled';

interface Props {
    restaurant: Restaurant
}

class RestaurantCardComponent extends React.PureComponent<Props, {}> {

    private renderRestaurantThumbnail() {
        const r = this.props.restaurant;
        if (r.thumb) {
            return <RestaurantThumbImg src={r.thumb} alt={r.name} width="600" loading="lazy" />;
        } else {
            return <RestaurantDefaultThumbImg src={restaurantIcon} alt={r.name} loading="lazy" />;
        }
    }

    public render() {
        const r = this.props.restaurant;
        return (
            <RestaurantCardSection>
                <RestaurantThumbLink to={`details/${r.id}`}>
                    {this.renderRestaurantThumbnail()}
                    <RestaurantThumbImgOverlay />
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