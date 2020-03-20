import React from 'react';
import { isEqual } from 'lodash';
import { Col } from '@bootstrap-styled/v4';
import {
    RestaurantsListingSection, RestaurantsListingContainer,
    RestaurantsListingRow, RestaurantsListingLoading, RestaurantsListingLoadMore, RestaurantsNotFound
} from './styled';
import errorIcon from '../../../../assets/images/error.png';
import { Restaurant } from '../../../../store/restaurants';
import { Loader } from '../../../../shared/components/Loader';
import RestaurantCardComponent from '../RestaurantCard';

export const RestaurantsLoadingComponent = React.memo((props: { isLoading: boolean; page?: number }) => {
    if (props.isLoading && props.page === 1) {
        return (
            <RestaurantsListingLoading>
                <Loader />
            </RestaurantsListingLoading>
        );
    }
    return <React.Fragment />
}, (prevProps, nextProps) => prevProps.isLoading === nextProps.isLoading);

const RestaurantsLoadMoreButton = React.memo((props: { isLoading: boolean; handleLoadMore?: Function }) => {
    return (
        <RestaurantsListingLoadMore>
            <button type="button" onClick={() => props.handleLoadMore && props.handleLoadMore()}>
                {props.isLoading ? 'Please wait...' : 'Load More'}
            </button>
        </RestaurantsListingLoadMore>
    );
}, (prevProps, nextProps) => {
    return prevProps.isLoading === nextProps.isLoading;
});

export const RestaurantsLoadMoreComponent = React.memo((props: { isLoading: boolean; hasLoadMore: boolean; page: number; handleLoadMore: Function }) => {
    if (props.hasLoadMore) {
        return <RestaurantsLoadMoreButton isLoading={props.isLoading} handleLoadMore={props.handleLoadMore} />
    } else {
        if (props.page > 1 && props.isLoading) {
            return <RestaurantsLoadMoreButton isLoading={props.isLoading} />
        }
        return <React.Fragment />
    }
}, (prevProps, nextProps) => {
    return prevProps.isLoading === nextProps.isLoading && prevProps.hasLoadMore === nextProps.hasLoadMore;
});

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

const RestaurantsList = React.memo((props: { restaurants: Restaurant[] }) => {
    return (
        <React.Fragment>
            {props.restaurants.map((r: Restaurant) => {
                return <Col key={r.id} lg={3} md={4} sm={6} xs={12}>
                    <RestaurantCardComponent key={r.id} restaurant={r}></RestaurantCardComponent>
                </Col>
            })}
        </React.Fragment>
    );
}, (prevProps, nextProps) => {
    return isEqual(prevProps.restaurants, nextProps.restaurants);
});

export const RestaurantListingWrapComponent = (props: { isLoading: boolean; restaurants: Restaurant[] }) => {
    return (
        <React.Fragment>
            <RestaurantsListingContainer>
                <RestaurantsListingRow>
                    <RestaurantsList restaurants={props.restaurants} />
                </RestaurantsListingRow>
            </RestaurantsListingContainer>
            <RestaurantsNotFoundMessage restaurants={props.restaurants} isLoading={props.isLoading} />
        </React.Fragment>
    );
};

export const RestaurantListingSectionComponent = (props: { children: any }) => {
    return (
        <RestaurantsListingSection>
            {props.children}
        </RestaurantsListingSection>
    );
}


