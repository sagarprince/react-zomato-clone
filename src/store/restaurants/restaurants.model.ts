export interface Location { 
    address: string;
    locality: string;
    city: string;
    latitude: string;
    longitude: string;
    locality_verbose: string;
}

export interface Rating {
    aggregate_rating: string;
    rating_text: string;
    rating_color: string;
}

export interface Photo {
    id: any;
    url: any;
    thumb_url: any;
}

export interface Restaurant {
    id: number;
    name: string;
    url: string;
    thumb: string;
    cuisines: string;
    location: Location;
    user_rating: Rating;
    all_reviews_count: number;
    photos: Photo[];
}

