import React from 'react';
import { Photo } from '../../../../store/restaurants';
import { RestaurantPhotosSection } from './styled';
import { RestuarantPhoto } from '../RestuarantPhoto';

export const RestaurantPhotos = React.memo((props: { name: string; photos: Photo[] }) => {
    return (
        <RestaurantPhotosSection className={props.photos.length === 0 ? 'no-photos' : ''}>
            {props.photos.length > 0 ? props.photos.map((p) => {
                return <RestuarantPhoto key={p.id} name={props.name} url={p.url} />;
            }) : 
            <h2>No Photos Found</h2>}
        </RestaurantPhotosSection>
    );
});