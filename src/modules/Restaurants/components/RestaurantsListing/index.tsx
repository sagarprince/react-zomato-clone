import React from 'react';
import { Col } from '@bootstrap-styled/v4';
import {
    RestaurantsListingSection, RestaurantsListingContainer,
    RestaurantsListingRow, RestaurantsListingLoading, RestaurantsListingLoadMore, RestaurantsNotFound
} from './styled';
import errorIcon from '../../../../assets/images/error.png';
import { Restaurant } from '../../../../store/restaurants';
import RestaurantCardComponent from '../RestaurantCard';

export function RestaurantsLoadingComponent(props: { isLoading: boolean, page?: number }) {
    if (props.isLoading && props.page === 1) {
        return (
            <RestaurantsListingLoading>
                <h3>Loading Please Wait...</h3>
            </RestaurantsListingLoading>
        );
    }
    return <React.Fragment />
}

export function RestaurantsLoadMoreComponent(props: { isLoading: boolean, hasLoadMore: boolean, handleLoadMore: Function }) {
    if (props.hasLoadMore) {
        return (
            <RestaurantsListingLoadMore>
                <button type="button" onClick={() => props.handleLoadMore()}>
                    {props.isLoading ? 'Please wait...' : 'Load More'}
                </button>
            </RestaurantsListingLoadMore>
        );
    }
    return <React.Fragment />
}

function RestaurantListingContainerComponent(props: { isLoading: boolean, restaurants: Restaurant[] }) {
    const notFoundMessage: any = () => (
        <RestaurantsNotFound>
            <img src={errorIcon} alt="No Restaurants Found" />
            <h3>No Restaurants Found.</h3>
        </RestaurantsNotFound>
    );

    const restaurantsList: any = () => (
        <RestaurantsListingContainer>
            <RestaurantsListingRow>
                {props.restaurants.map((r: Restaurant) => {
                    return <Col key={r.id} lg={3} md={4} sm={6} xs={12}>
                        <RestaurantCardComponent key={r.id} restaurant={r}></RestaurantCardComponent>
                    </Col>
                })}
            </RestaurantsListingRow>
        </RestaurantsListingContainer>
    );

    if (props.restaurants.length === 0 && !props.isLoading) {
        return notFoundMessage();
    }
    return restaurantsList();
}

export const MRestaurantListingContainerComponent = React.memo(RestaurantListingContainerComponent);

export const RestaurantListingSectionComponent = (props: { children: any }) => {
    return (
        <RestaurantsListingSection>
            {props.children}
        </RestaurantsListingSection>
    );
}


