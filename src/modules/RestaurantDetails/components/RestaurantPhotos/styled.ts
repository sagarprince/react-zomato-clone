import styled from 'styled-components';

export const RestaurantPhotosSection = styled.section`
    height: 400px;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    
    &.no-photos {
        align-items: center;
        justify-content: center;
    }

    &::-webkit-scrollbar {
        display: none;
    }

    @media(max-width: 540px) {
        height: 300px;
    }

    > div {
        flex: 0 0 auto;
    }
`;