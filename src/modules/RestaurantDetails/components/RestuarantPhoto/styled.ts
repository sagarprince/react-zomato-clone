import styled from 'styled-components';

export const RestuarantPhotoWrap = styled.div`
    overflow: hidden;
`;

export const RestaurantLazyPhotoWrap = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const RestaurantPhotoImg = styled.img`
    width: 400px;
    height: 400px;
    object-fit: cover;

    @media(max-width: 540px) {
        width: 300px;
        height: 300px;
    }

    &.loaded {
        opacity: 1;
        animation: reveal 0.3s cubic-bezier(0.42, 0, 0.05, 0.99);
    }
    @keyframes reveal {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }
    }
`;

export const RestaurantDefaultPhotoWrap = styled.div`
    position: relative;
    width: 400px;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media(max-width: 540px) {
        width: 300px;
        height: 300px;
    }

    img {
        width: 100px;
        height: 100px;
    }
`;

export const RestaurantPhotoOverlay = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: linear-gradient(119.56deg, rgba(0, 0, 0, 0.7) 2.59%, rgba(0, 0, 0, 0) 63.67%), linear-gradient(305.27deg, rgba(0, 0, 0, 0.7) 0.19%, rgba(0, 0, 0, 0) 54.37%);
`;