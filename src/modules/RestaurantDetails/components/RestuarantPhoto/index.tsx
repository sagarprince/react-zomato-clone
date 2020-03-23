import React from 'react';
import { createResource, createCache } from 'simple-cache-provider';
import { proxy } from 'comlink';
import useIntersect from '../../../../shared/hooks/useIntersect';
import restaurantIcon from '../../../../assets/images/restaurant_icon.png';
import { RestuarantPhotoWrap, RestaurantPhotoImg, RestaurantDefaultPhotoWrap, RestaurantLazyPhotoWrap, RestaurantPhotoOverlay } from './styled';
import { fetchRestaurantImage } from '../../../../workers/worker.service';
import ErrorBoundry from '../../../../shared/components/ErrorBoundry';

declare let Image: any;

interface IProps {
    name: string;
    url: string;
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

const RestaurantDefaultPhoto = (props: { name: string }) => {
    return (
        <RestaurantDefaultPhotoWrap>
            <img src={restaurantIcon} alt={props.name} loading="lazy" />
            <RestaurantPhotoOverlay />
        </RestaurantDefaultPhotoWrap>
    );
}

const RestaurantLazyPhoto = (props: any) => {
    const { name, url } = props;
    const [ref, entry] = useIntersect({
        threshold: buildThresholdArray()
    });
    // console.log('Ratio ', entry.intersectionRatio, restaurant.name, entry.isIntersecting);
    let photo;
    if (entry.isIntersecting) {
        photo = ImageResource.read(cache, url);
    }
    return (
        <RestaurantLazyPhotoWrap ref={ref}>
            {entry.isIntersecting ? (
                <RestaurantPhotoImg className="loaded" src={photo} alt={name} width="600" />
            ) : <RestaurantDefaultPhoto name={name} />}
        </RestaurantLazyPhotoWrap>
    );
};

const RestaurantFallbackPhoto = (props: { name: string }) => {
    const { name } = props;
    return <RestaurantDefaultPhoto name={name} />;
}

export const RestuarantPhoto: React.FC<IProps> = (props: IProps) => {
    const { name, url } = props;

    return (
        <RestuarantPhotoWrap>
            <ErrorBoundry fallback={<RestaurantFallbackPhoto name={name} />}>
                <React.Suspense fallback={<RestaurantFallbackPhoto name={name} />}>
                    {url ?
                        <RestaurantLazyPhoto name={name} url={url} /> :
                        <RestaurantDefaultPhoto name={name} />}
                </React.Suspense>
            </ErrorBoundry>
        </RestuarantPhotoWrap>
    );
}