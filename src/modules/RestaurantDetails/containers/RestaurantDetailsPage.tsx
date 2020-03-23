import React from 'react';
import styled from 'styled-components';
import { useRestaurantDetailsFacade } from '../../../store/restaurants';
import { RestaurantPhotos } from '../components/RestaurantPhotos';
import { RestaurantInfo } from '../components/RestaurantInfo';

interface IProps {
    match: {
        params: {
            id: any;
        }
    }
}

const RestuarantDetailsPageSection = styled.section``;

export function RestaurantDetailsPage(props: IProps) {
    const { id } = props.match.params;
    const restaurant = useRestaurantDetailsFacade(id);
    console.log(restaurant);
    if (Object.keys(restaurant).length === 0) {
        return <React.Fragment />;
    }
    return (
        <RestuarantDetailsPageSection>
            <RestaurantPhotos name={restaurant.name} photos={restaurant.photos} />
            <RestaurantInfo
                name={restaurant.name}
                cuisines={restaurant.cuisines}
                location={restaurant.location}
                rating={restaurant.user_rating}
                totalReviews={restaurant.all_reviews_count}
            />
        </RestuarantDetailsPageSection>
    );
}