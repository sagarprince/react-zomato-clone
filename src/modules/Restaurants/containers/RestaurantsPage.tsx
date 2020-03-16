import React from 'react';
import styled from 'styled-components';
import RestuarantsSearch from './RestaurantsSearch';
import RestuarantsListing from './RestaurantsListing';

const RestuarantsPageSection = styled.section``;

export class RestuarantsPage extends React.PureComponent<{}, {}> {
    public render() {
        return (
            <RestuarantsPageSection>
                <RestuarantsSearch />
                <RestuarantsListing />
            </RestuarantsPageSection>
        )
    }
}