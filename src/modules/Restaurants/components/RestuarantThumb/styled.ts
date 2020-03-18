import styled from 'styled-components';

export const RestaurantThumbImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    &.loaded {
        opacity: 1;
        animation: reveal 0.4s ease-out;
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

export const RestaurantDefaultThumbImg = styled.img``;

export const RestaurantThumbImgOverlay = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    border-radius: 0.6rem;
    background: linear-gradient(119.56deg, rgba(0, 0, 0, 0.7) 2.59%, rgba(0, 0, 0, 0) 63.67%), linear-gradient(305.27deg, rgba(0, 0, 0, 0.7) 0.19%, rgba(0, 0, 0, 0) 54.37%);
`;