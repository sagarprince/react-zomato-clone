import React from 'react';
import { createResource, createCache } from 'simple-cache-provider';
import { proxy } from 'comlink';
import useIntersect from '../../../../shared/hooks/useIntersect';
import { Restaurant } from '../../../../store/restaurants';
import restaurantIcon from '../../../../assets/images/restaurant_icon.png';
import { RestaurantThumbImg, RestaurantDefaultThumbImg, RestaurantThumbImgOverlay, RestaurantLazyThumbWrap } from './styled';
import { fetchRestaurantImage } from '../../../../workers/worker.service';
import ErrorBoundry from '../../../../shared/components/ErrorBoundry';

declare let Image: any;

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

const buildThresholdArray: any = () => Array.from(Array(20).keys(), i => i / 20);

const RestaurantLazyThumb = (props: any) => {
    const { restaurant } = props;
    const [ref, entry] = useIntersect({
        threshold: buildThresholdArray()
    });
    // console.log('Ratio ', entry.intersectionRatio, restaurant.name, entry.isIntersecting);
    let thumb;
    if (entry.isIntersecting) {
        thumb = ImageResource.read(cache, restaurant.thumb);
    }
    return (
        <RestaurantLazyThumbWrap ref={ref}>
            {entry.isIntersecting ? (
                <RestaurantThumbImg className="loaded" src={thumb} alt={restaurant.name} width="600" />
            ) : <RestaurantDefaultThumbImg src={restaurantIcon} alt={restaurant.name} />}
        </RestaurantLazyThumbWrap>
    );
};

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