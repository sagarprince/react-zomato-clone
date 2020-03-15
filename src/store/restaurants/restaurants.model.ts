
export interface Restaurant {
    id: number;
    name: string;
    url: string;
    thumb: string;
    cuisines: string;
    location: { 
        address: string;
        locality: string;
        city: string;
        latitude: string;
        longitude: string;
        locality_verbose: string;
    }
    user_rating: {
        aggregate_rating: string;
        rating_text: string;
        rating_color: string;
    }
}

