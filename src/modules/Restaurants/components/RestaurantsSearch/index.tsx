import React, { useState, useEffect, useRef } from 'react';
import { RestaurantSearchSection, RestaurantSearchForm, RestaurantSearchInput } from './styled';

declare let document: any;

interface IProps {
    query: string;
    onSubmitSearch: Function
}

export function RestaurantsSearchComponent(props: IProps) {
    const [query, setQuery] = useState(props.query);
    const [submitted, setSubmitted] = useState(false);
    const inputRef: any = useRef();

    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            const scrollingElement = document.scrollingElement || document.documentElement;
            scrollingElement.scrollTop = 0;
        });

        return () => {
            frame && cancelAnimationFrame(frame);
        };
    }, [submitted]);

    function handleSubmit(event: any) {
        event.preventDefault();
        inputRef.current?.blur();
        if (props.onSubmitSearch) {
            setSubmitted(true);
            props.onSubmitSearch(query);
            setTimeout(() => setSubmitted(false), 500);
        }
    }

    function handleChange(e: any) {
        setQuery(e.target.value);
    }

    return (
        <RestaurantSearchSection>
            <RestaurantSearchForm onSubmit={handleSubmit}>
                <RestaurantSearchInput
                    ref={inputRef}
                    placeholder="Search..."
                    value={query}
                    onChange={handleChange}></RestaurantSearchInput>
            </RestaurantSearchForm>
        </RestaurantSearchSection>
    );
}