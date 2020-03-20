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


function RestuarantsLoading() {
    const [{ isLoading }] = useRestaurantsLoadingFacade();
    const page = restaurantsQuery.page;
    console.log('IS LOADING...', isLoading);
    
    return (
        <RestaurantsLoadingComponent
            isLoading={isLoading}
            page={(page - 1)}
        />
    );
}

function RestuarantsLoadMore() {
    const [{ isLoading }] = useRestaurantsLoadingFacade();
    const [{ hasLoadMore }] = useRestaurantsHasLoadMoreFacade();
    const page = restaurantsQuery.page;

    // console.log('LOAD MORE...');

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

function RestuarantsListingWrap() {
    const [{ restaurants }] = useRestaurantsFacade();
    const isLoading = restaurantsQuery.isLoading;

    console.log('LISTING...', restaurants);

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
                <RestuarantsLoading></RestuarantsLoading>
                <RestaurantListingSectionComponent>
                    <RestuarantsListingWrap></RestuarantsListingWrap>
                    <RestuarantsLoadMore></RestuarantsLoadMore>
                </RestaurantListingSectionComponent>
            </React.Fragment>
        );
    }
}

export default RestuarantsListing;
