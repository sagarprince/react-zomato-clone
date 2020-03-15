import React from 'react';
import { RestaurantsSearchComponent } from '../components/restaurants-search'; 
import { restaurantsService, restaurantsQuery } from '../../../store/restaurants';

class RestuarantsSearch extends React.PureComponent<{}, {}> {
    private handleSearchSubmit(query: any) {
        restaurantsService.setFilters({
            query: query,
            page: 1
        });
        restaurantsService.getRestaurants();
    }

    public render() {
        return (
            <RestaurantsSearchComponent
                query={restaurantsQuery.query}
                onSubmitSearch={this.handleSearchSubmit.bind(this)}></RestaurantsSearchComponent>
        )
    }
}

export default RestuarantsSearch;