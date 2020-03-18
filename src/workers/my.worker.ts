import { expose } from 'comlink';
import { restaurantsRestService } from '../store/restaurants/restaurants.rest.service';

const exports = {
    restaurantsRestService
};

export type MyWorker = typeof exports;

expose(exports);