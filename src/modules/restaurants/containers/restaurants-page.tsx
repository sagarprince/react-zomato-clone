import React from 'react';
import styled from 'styled-components';
import RestuarantsSearch from './restaurants-search';
import RestuarantsListing from './restaurants-listing';

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