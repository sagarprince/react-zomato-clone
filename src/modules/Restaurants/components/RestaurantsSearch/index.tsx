import React from 'react';
import { RestaurantSearchSection, RestaurantSearchForm, RestaurantSearchInput } from './styled';

interface Props {
    query: string;
    onSubmitSearch: Function
}

interface State {
    query: string;
}

export class RestaurantsSearchComponent extends React.PureComponent<Props, State> {
    inputRef: any;

    constructor(props: Props) {
        super(props);
        this.state = {
            query: props.query
        }
        this.inputRef = React.createRef();
    }

    private handleSubmit(event: any): void {
        event.preventDefault();
        this.inputRef.current.blur();
        if (this.props.onSubmitSearch) {
            this.props.onSubmitSearch(this.state.query);
        }
    }

    private handleChange(event: any): void {
        this.setState({ query: event.target.value });
    }

    public render() {
        return (
            <RestaurantSearchSection>
                <RestaurantSearchForm onSubmit={this.handleSubmit.bind(this)}>
                    <RestaurantSearchInput
                        ref={this.inputRef}
                        placeholder="Search..."
                        value={this.state.query}
                        onChange={this.handleChange.bind(this)}></RestaurantSearchInput>
                </RestaurantSearchForm>
            </RestaurantSearchSection>
        );
    }
}
