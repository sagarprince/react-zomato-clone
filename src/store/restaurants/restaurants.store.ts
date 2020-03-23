import { Restaurant } from './restaurants.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface RestaurantsState extends EntityState<Restaurant> {
  isInitialLoading: boolean;
  filters: {
    query?: string;
    page?: number;
    offset?: number;
  },
  totalRecords: number;
}

const initialState: RestaurantsState = {
  isInitialLoading: true,
  filters: {
    query: '',
    page: 1,
    offset: 0
  },
  totalRecords: 0
};

@StoreConfig({ name: 'restaurants' })
export class RestaurantsStore extends EntityStore<RestaurantsState, Restaurant> {
  constructor() {
    super(initialState);
  }
}

export const restaurantsStore = new RestaurantsStore();
