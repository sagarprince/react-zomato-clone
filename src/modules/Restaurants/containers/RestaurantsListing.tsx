import React from 'react';
import { throttle } from 'lodash';
import {
    restaurantsService,
    useRestaurantsLoadingFacade, useRestaurantsFacade, 
    useRestaurantsHasLoadMoreFacade, restaurantsQuery
} from '../../../store/restaurants';
import {
    RestaurantsLoadingComponent, RestaurantsLoadMoreComponent,
    RestaurantListingWrapComponent, RestaurantListingSectionComponent
} from '../components/RestaurantsListing';


function RestaurantsLoading() {
    const [{ isLoading }] = useRestaurantsLoadingFacade();
    const page = restaurantsQuery.page;

    return (
        <RestaurantsLoadingComponent
            isLoading={isLoading}
            page={(page - 1)}
        />
    );
}

function RestaurantsLoadMore() {
    const [{ isLoading }] = useRestaurantsLoadingFacade();
    const [{ hasLoadMore }] = useRestaurantsHasLoadMoreFacade();
    const page = restaurantsQuery.page;

    const onLoadMore = () => {
        restaurantsService.setFilters({
            page: page
        });
        restaurantsService.getRestaurants();
    }

    const handleLoadMoreThrottled = throttle(onLoadMore, 1000);

    return (
        <RestaurantsLoadMoreComponent
            isLoading={isLoading}
            hasLoadMore={hasLoadMore}
            page={(page - 1)}
            handleLoadMore={handleLoadMoreThrottled}
        />
    );
}

function RestaurantsListingWrap() {
    const [{ restaurants }] = useRestaurantsFacade();
    const isLoading = restaurantsQuery.isLoading;

    return (
        <RestaurantListingWrapComponent
            restaurants={restaurants || []}
            isLoading={isLoading}
        />
    );
}

class RestuarantsListing extends React.PureComponent<{}, {}> {
    public render() {
        return (
            <React.Fragment>
                <RestaurantsLoading></RestaurantsLoading>
                <RestaurantListingSectionComponent>
                    <RestaurantsListingWrap></RestaurantsListingWrap>
                    <RestaurantsLoadMore></RestaurantsLoadMore>
                </RestaurantListingSectionComponent>
            </React.Fragment>
        );
    }
}

export default RestuarantsListing;
