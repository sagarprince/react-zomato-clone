import React from 'react';
import { RestaurantsSearchComponent } from '../components/RestaurantsSearch';
import { restaurantsService, restaurantsQuery } from '../../../store/restaurants';

function RestuarantsSearch() {

    const handleSearchSubmit = (query: string) => {
        restaurantsService.setFilters({
            query: query,
            page: 1
        });
        restaurantsService.getRestaurants();
    }

    return (
        <RestaurantsSearchComponent
                query={restaurantsQuery.query}
                onSubmitSearch={handleSearchSubmit}></RestaurantsSearchComponent>
    );
}

export default RestuarantsSearch;