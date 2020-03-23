import axios from 'axios';
import { API_BASE_URL, API_KEY } from '../../config';

export class RestaurantsRestService {
    private http: any;

    constructor() {
        this.http = axios.create({
            baseURL: API_BASE_URL,
            headers: { 'user-key': API_KEY }
        });
    }

    public getRestaurants(params: any = {}): Promise<any> {
        const defaultParams = {
            start: 0,
            sort: 'cost',
            order: 'desc'
        };
        const payload: any = {
            ...defaultParams,
            ...params
        };
        const queryParams = Object.keys(payload).map(key => key + '=' + payload[key]).join('&');

        return new Promise((resolve, reject) => {
            this.http.get(`/search?${queryParams}`)
                .then((response: any) => {
                    const totalRecords = response && response.data ? response.data.results_found : 0;
                    const restaurants = response && response.data ? response.data.restaurants.map((x: any) => {
                        const restaurant = x.restaurant;
                        const photos = restaurant.photos ? restaurant.photos.map((p: any) => p.photo) : [];
                        return { ...restaurant, photos };
                    }) : [];
                    resolve({
                        totalRecords: totalRecords,
                        restaurants: restaurants
                    });
                }).catch((err: any) => {
                    reject(err);
                });
        })
    }

}

export const restaurantsRestService = new RestaurantsRestService();