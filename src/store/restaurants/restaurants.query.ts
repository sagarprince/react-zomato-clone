import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { map, distinctUntilChanged, tap, filter } from 'rxjs/operators';
import { RestaurantsState, restaurantsStore, RestaurantsStore } from './restaurants.store';
import { Restaurant } from './restaurants.model';

export class RestaurantsQuery extends QueryEntity<RestaurantsState, Restaurant> {
  constructor(protected store: RestaurantsStore) {
    super(store);
  }

  private isInitialState = true;

  private setInitialState() {
    if (this.getAll().length > 0) {
      this.isInitialState = false;
    }
  }

  public isLoading$ = this.selectLoading().pipe(
    tap(() => {
      this.setInitialState();
    }),
    filter(() => !this.isInitialState),
    distinctUntilChanged()
  );

  public entities$ = this.selectAll().pipe(
    tap(() => {
      this.setInitialState();
    }),
    filter(() => !this.isInitialState),
    distinctUntilChanged((prev, curr) => {
      return prev.length === curr.length;
    })
  );

  public filters$ = this.select('filters').pipe(
    tap(() => {
      this.setInitialState();
    }),
    filter(() => !this.isInitialState),
    distinctUntilChanged()
  );

  public hasLoadMore(): Observable<boolean> {
    return this.select(['totalRecords', 'filters']).pipe(
      distinctUntilChanged(),
      filter((data) => data.totalRecords > 0),
      map((data) => {
        // simulate total records
        return { ...data, totalRecords: data.totalRecords > 20 ? 80 : 20 };
      }),
      map((data) => {
        const page = data.filters.page || 1;
        const total = Math.ceil(data.totalRecords / 20);
        return !(page >= total);
      })
    );
  }

  get isLoading(): boolean {
    return this.getValue().loading || true;
  }

  get query(): string {
    return this.getValue().filters.query || '';
  }

  get page(): number {
    return (this.getValue().filters.page || 1) + 1;
  }

  get entities(): any {
    return this.getAll();
  }
}

export const restaurantsQuery = new RestaurantsQuery(restaurantsStore);
