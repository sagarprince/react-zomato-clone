import { wrap } from 'comlink';

const worker = new Worker('./my.worker', {
    name: 'my-worker',
    type: 'module'
});
const workerApi = wrap<import('./my.worker').MyWorker>(worker);

export function getRestaurants(params: any): Promise<any> {
    return workerApi.restaurantsRestService.getRestaurants(params);
}

export function fetchRestaurantImage(callback: Function) {
    callback();
}