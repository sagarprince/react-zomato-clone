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
    const [{ isLoading, isInitalLoading }] = useRestaurantsLoadingFacade();
    const page = restaurantsQuery.page;
    return (
        <RestaurantsLoadingComponent
            isLoading={isInitalLoading ? isInitalLoading : isLoading}
            page={isInitalLoading ? 1 : (page - 1)}
        />
    );
}

function RestaurantsLoadMore() {
    const [{ isLoading, isInitalLoading }] = useRestaurantsLoadingFacade();
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
            isLoading={isInitalLoading || isLoading}
            hasLoadMore={hasLoadMore}
            page={isInitalLoading ? 1 : (page - 1)}
            handleLoadMore={handleLoadMoreThrottled}
        />
    );
}

function RestaurantsListingWrap() {
    const [{ isLoading }] = useRestaurantsLoadingFacade();
    const [{ restaurants }] = useRestaurantsFacade();

    return (
        <RestaurantListingWrapComponent
            isLoading={isLoading}
            restaurants={restaurants || []}
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
