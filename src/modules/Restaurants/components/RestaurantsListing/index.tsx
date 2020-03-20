import React from 'react';
import { Col } from '@bootstrap-styled/v4';
import {
    RestaurantsListingSection, RestaurantsListingContainer,
    RestaurantsListingRow, RestaurantsListingLoading, RestaurantsListingLoadMore, RestaurantsNotFound
} from './styled';
import errorIcon from '../../../../assets/images/error.png';
import { Restaurant } from '../../../../store/restaurants';
import RestaurantCardComponent from '../RestaurantCard';
import { Loader } from '../../../../shared/components/Loader';

export const RestaurantsLoadingComponent = React.memo(
    function RestaurantsLoadingComponent(props: { isLoading: boolean; page?: number }) {
        if (props.isLoading && props.page === 1) {
            return (
                <RestaurantsListingLoading>
                    <Loader />
                </RestaurantsListingLoading>
            );
        }
        return <React.Fragment />
    }
)

export function RestaurantsLoadMoreComponent(props: { isLoading: boolean; hasLoadMore: boolean; page: number; handleLoadMore: Function }) {
    if (props.hasLoadMore) {
        return (
            <RestaurantsListingLoadMore>
                <button type="button" onClick={() => props.handleLoadMore()}>
                    {props.isLoading ? 'Please wait...' : 'Load More'}
                </button>
            </RestaurantsListingLoadMore>
        );
    } else {
        if (props.page > 1 && props.isLoading) {
            return (
                <RestaurantsListingLoadMore>
                    <button type="button">Please wait...</button>
                </RestaurantsListingLoadMore>
            );
        }
        return <React.Fragment />
    }
}

const RestaurantsNotFoundMessage = React.memo((props: any) => {
    if (props.restaurants.length === 0 && !props.isLoading) {
        return (
            <RestaurantsNotFound>
                <img src={errorIcon} alt="No Restaurants Found" />
                <h3>No Restaurants Found.</h3>
            </RestaurantsNotFound>
        );
    }
    return <React.Fragment />
});

export const RestaurantListingWrapComponent = React.memo(function RestaurantListingWrapComponent(props: { isLoading: boolean; restaurants: Restaurant[] }) {
    return (
        <React.Fragment>
            <RestaurantsListingContainer>
                <RestaurantsListingRow>
                    {props.restaurants.map((r: Restaurant) => {
                        return <Col key={r.id} lg={3} md={4} sm={6} xs={12}>
                            <RestaurantCardComponent key={r.id} restaurant={r}></RestaurantCardComponent>
                        </Col>
                    })}
                </RestaurantsListingRow>
            </RestaurantsListingContainer>
            <RestaurantsNotFoundMessage restaurants={props.restaurants} isLoading={props.isLoading} />
        </React.Fragment>
    );
});

export const RestaurantListingSectionComponent = (props: { children: any }) => {
    return (
        <RestaurantsListingSection>
            {props.children}
        </RestaurantsListingSection>
    );
}


