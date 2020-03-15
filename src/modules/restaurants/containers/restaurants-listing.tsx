import React from 'react';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { untilDestroyed } from '../../../utils/take-until';
import { throttle } from 'lodash';
import { Restaurant, restaurantsService, restaurantsQuery } from '../../../store/restaurants';
import {
    RestaurantsLoadingComponent, RestaurantsLoadMoreComponent,
    RestaurantListingContainerComponent, RestaurantListingSectionComponent
} from '../components/restaurants-listing';

class RestuarantsLoading extends React.PureComponent<{}, { isLoading: boolean, page: number }> {
    constructor(props: any) {
        super(props);
        this.state = {
            page: 1,
            isLoading: false
        };
    }

    public componentDidMount() {
        restaurantsQuery.isLoading$
            .pipe(untilDestroyed(this), distinctUntilChanged())
            .subscribe(isLoading => this.setState({ isLoading }));
        restaurantsQuery.filters$
            .pipe(
                untilDestroyed(this),
                distinctUntilChanged(),
                map((filters) => filters.page || 1)
            )
            .subscribe(page => this.setState({ page }));
    }

    public render() {
        return <RestaurantsLoadingComponent
            isLoading={this.state.isLoading}
            page={this.state.page}
        />
    }
}

class RestuarantsLoadMore extends React.PureComponent<{}, { isLoading: boolean, hasLoadMore: boolean }> {
    page: number = 1;
    handleLoadMore: any;
    handleLoadMoreThrottled: any;

    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: false,
            hasLoadMore: false
        };
        this.handleLoadMore = this.onLoadMore.bind(this);
        this.handleLoadMoreThrottled = throttle(this.handleLoadMore, 1000);
    }

    public componentDidMount() {
        restaurantsQuery.isLoading$
            .pipe(untilDestroyed(this), distinctUntilChanged())
            .subscribe(isLoading => this.setState({ isLoading }));
        restaurantsQuery.hasLoadMore()
            .pipe(untilDestroyed(this), distinctUntilChanged())
            .subscribe(hasLoadMore => this.setState({ hasLoadMore }));
        restaurantsQuery.filters$
            .pipe(untilDestroyed(this), distinctUntilChanged(), map((filters) => filters.page || 1))
            .subscribe(page => this.page = page);
    }

    private onLoadMore(): void {
        this.page = this.page + 1;
        restaurantsService.setFilters({
            page: this.page
        });
        restaurantsService.getRestaurants();
    }

    public render() {
        return <RestaurantsLoadMoreComponent
            isLoading={this.state.isLoading}
            hasLoadMore={this.state.hasLoadMore}
            handleLoadMore={this.handleLoadMoreThrottled}
        />
    }

    componentWillUnmount() {
        this.handleLoadMoreThrottled.cancel();
    }
}


class RestuarantsListingContainer extends React.PureComponent<{}, { restaurants: Restaurant[], isLoading: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = {
            restaurants: [],
            isLoading: true
        };
    }

    public componentDidMount() {
        restaurantsService.getRestaurants();
        restaurantsQuery.entities$
            .pipe(untilDestroyed(this), distinctUntilChanged())
            .subscribe(restaurants => this.setState({ restaurants }));
        restaurantsQuery.isLoading$
            .pipe(untilDestroyed(this), distinctUntilChanged())
            .subscribe(isLoading => this.setState({ isLoading }));
    }

    public render() {
        return (
            <RestaurantListingContainerComponent
                restaurants={this.state.restaurants}
                isLoading={this.state.isLoading}
            />
        );
    }
}

class RestuarantsListing extends React.PureComponent<{}, {}> {
    public render() {
        return (
            <React.Fragment>
                <RestuarantsLoading></RestuarantsLoading>
                <RestaurantListingSectionComponent>
                    <RestuarantsListingContainer></RestuarantsListingContainer>
                    <RestuarantsLoadMore></RestuarantsLoadMore>
                </RestaurantListingSectionComponent>
            </React.Fragment>
        );
    }
}

export default RestuarantsListing;
