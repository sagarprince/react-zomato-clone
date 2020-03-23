import { RestaurantsStore, restaurantsStore } from './restaurants.store';
import { RestaurantsRestService, restaurantsRestService } from './restaurants.rest.service';
import { getRestaurants } from '../../workers/worker.service';

export class RestaurantsService {
    constructor(
        public store: RestaurantsStore,
        public restaurantsRestService: RestaurantsRestService
    ) { }

    public fetchRestaurants(params: any = {}): void {
        this.store.setLoading(true);
        getRestaurants(params).then((data) => {
            this.store.update({ totalRecords: data.totalRecords });
            if (params && params.start > 0) {
                this.store.add(data.restaurants);
            } else {
                this.store.set(data.restaurants);
            }
            this.store.setLoading(false);
        }).catch(() => {
            this.store.setLoading(false);
            this.store.update({ isInitialLoading: false });
        });
    }

    public setFilters(filters: { query?: string, page?: number } = { query: '', page: 1 }): void {
        const limit = 20;
        const offset = filters.page && filters.page > 1 ? ((filters.page || 1) - 1) * limit + 1 : 0;
        const _filters = {
            page: filters.page,
            offset: offset,
            query: filters.query !== undefined ? filters.query : this.store.getValue().filters.query
        };
        this.store.update({
            filters: _filters
        });
    }

    public getRestaurants(): void {
        const params = {
            q: this.store.getValue().filters.query,
            start: this.store.getValue().filters.offset
        };
        this.fetchRestaurants(params);
    }
}

export const restaurantsService = new RestaurantsService(restaurantsStore, restaurantsRestService);