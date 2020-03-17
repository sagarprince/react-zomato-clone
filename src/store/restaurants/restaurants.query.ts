import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { RestaurantsState, restaurantsStore, RestaurantsStore } from './restaurants.store';
import { Restaurant } from './restaurants.model';

export class RestaurantsQuery extends QueryEntity<RestaurantsState, Restaurant> {
  constructor(protected store: RestaurantsStore) {
    super(store);
  }

  public isLoading$ = this.selectLoading();

  public entities$ = this.selectAll();

  public filters$ = this.select('filters');

  public hasLoadMore(): Observable<boolean> {
    return this.select(['totalRecords', 'filters']).pipe(
      distinctUntilChanged(),
      map((data) => {
        const page = data.filters.page || 1;
        // const total = Math.ceil(totalRecords / 20);
        const total = data.totalRecords > 20 ? 4 : 1;
        return page < total;
      })
    );
  }

  get query(): string {
    return this.getValue().filters.query || '';
  }

  get entities(): any {
    return this.getAll();
  }
}

export const restaurantsQuery = new RestaurantsQuery(restaurantsStore);
