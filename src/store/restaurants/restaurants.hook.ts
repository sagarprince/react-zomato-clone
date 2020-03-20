import { useState, useEffect } from 'react';
import { Observable, Subscription } from 'rxjs';
import { Restaurant } from './restaurants.model';
import { restaurantsService } from './restaurants.service';
import { restaurantsQuery } from './restaurants.query';

function onEmit<T>(source$: Observable<T>, nextFn: (value: T) => void): Subscription {
    return source$.subscribe(nextFn, console.error);
}

export function useRestaurantsLoadingFacade() {
    const [state, setState] = useState({ isLoading: true } as { isLoading: boolean });

    useEffect(() => {
        const subscriptions: Subscription[] = [
            onEmit<boolean>(restaurantsQuery.isLoading$, isLoading => setState(state => ({ ...state, isLoading }))),
        ];

        return () => { subscriptions.map(it => it.unsubscribe()) };
    }, [state.isLoading]);

    return [state];
}

export function useRestaurantsFacade() {
    const [state, setState] = useState({ restaurants: [] } as { restaurants: Restaurant[] });

    useEffect(() => {
        if (restaurantsQuery.entities.length === 0) {
            restaurantsService.getRestaurants();
        }

        const subscriptions: Subscription[] = [
            onEmit<Restaurant[]>(restaurantsQuery.entities$, restaurants => setState(state => ({ ...state, restaurants }))),
        ];

        return () => { subscriptions.map(it => it.unsubscribe()) };
    }, []);

    return [state];
}

export function useRestaurantsHasLoadMoreFacade() {
    const [state, setState] = useState({ hasLoadMore: false } as { hasLoadMore: boolean });

    useEffect(() => {
        const subscriptions: Subscription[] = [
            onEmit<boolean>(restaurantsQuery.hasLoadMore(), (hasLoadMore) => {
                setState(state => ({ ...state, hasLoadMore }));
            }),
        ];

        return () => { subscriptions.map(it => it.unsubscribe()) };
    }, [state.hasLoadMore]);

    return [state];
}