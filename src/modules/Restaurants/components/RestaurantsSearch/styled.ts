import styled from 'styled-components';
import { Form } from '@bootstrap-styled/v4';

export const RestaurantSearchSection = styled.section`
    position: fixed;
    width: 100%;
    z-index: 2;
    display: flex;
    -webkit-box-shadow: 0px 1px 10px 1px rgba(0,0,0,0.3);
    -moz-box-shadow: 0px 1px 10px 1px rgba(0,0,0,0.3);
    box-shadow: 0px 1px 10px 1px rgba(0,0,0,0.3);
    overflow: hidden;
`;

export const RestaurantSearchForm = styled(Form)`
    width: 100%;
`;

export const RestaurantSearchInput = styled.input`
   width: 100%;
   padding: 15px;
   font-family: 'Fira Sans Condensed', sans-serif;
   font-size: 18px;
   border: 0 none;
   outline: none;
`;