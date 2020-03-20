import React from 'react';
import { createResource, createCache } from 'simple-cache-provider';
import { proxy } from 'comlink';
import { Restaurant } from '../../../../store/restaurants';
import restaurantIcon from '../../../../assets/images/restaurant_icon.png';
import { RestaurantThumbImg, RestaurantDefaultThumbImg, RestaurantThumbImgOverlay } from './styled';
import { fetchRestaurantImage } from '../../../../workers/worker.service';
import ErrorBoundry from '../../../../shared/components/ErrorBoundry';

interface IProps {
    restaurant: Restaurant
};

const cache = createCache();
const ImageResource = createResource(
    (src: string) => new Promise((resolve, reject) => {
        fetchRestaurantImage(proxy(() => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve(src);
            img.onerror = () => reject('Image not loaded...');
        }));
    })
);

const RestaurantLazyThumb = (props: IProps) => {
    const { restaurant } = props;
    const thumb = ImageResource.read(cache, restaurant.thumb);
    return <RestaurantThumbImg className="loaded" src={thumb} alt={restaurant.name} width="600" />;
}

const RestaurantFallbackThumb = (props: { name: string }) => {
    const { name } = props;
    return (
        <React.Fragment>
            <RestaurantDefaultThumbImg src={restaurantIcon} alt={name} />
            <RestaurantThumbImgOverlay />
        </React.Fragment>
    );
}

export const RestuarantThumb: React.FC<IProps> = (props: IProps) => {
    const { restaurant } = props;

    return (
        <ErrorBoundry fallback={<RestaurantFallbackThumb name={restaurant.name} />}>
            <React.Suspense fallback={<RestaurantFallbackThumb name={restaurant.name} />}>
                {restaurant.thumb ?
                    <RestaurantLazyThumb restaurant={restaurant} /> :
                    <RestaurantDefaultThumbImg src={restaurantIcon} alt={restaurant.name} loading="lazy" />}
                <RestaurantThumbImgOverlay />
            </React.Suspense>
        </ErrorBoundry>
    );
}