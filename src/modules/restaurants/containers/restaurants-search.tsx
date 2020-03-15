import React from 'react';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { untilDestroyed } from '../../../utils/take-until';
import { RestaurantsSearchComponent } from '../components/restaurants-search';
import { restaurantsService, restaurantsQuery } from '../../../store/restaurants';

class RestuarantsSearch extends React.PureComponent<{}, {}> {

    public componentDidMount() {
        restaurantsQuery.filters$
            .pipe(
                untilDestroyed(this),
                distinctUntilChanged(),
                map((filters) => filters.page || 1)
            )
            .subscribe(page => {
                if (page === 1) {
                    requestAnimationFrame(() => {
                        const scrollingElement = document.scrollingElement || document.documentElement;
                        scrollingElement.scrollTop = 0;
                    });
                }
            });
    }

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