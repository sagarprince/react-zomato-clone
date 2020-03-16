import React from 'react';

interface Props {
    match: {
        params: {
            id: any;
        }
    }
}

export class RestaurantDetailsPage extends React.PureComponent<Props, {}> {
    public render() {
        const { id } = this.props.match.params;
        console.log(id);
        return (
            <div>
                <h2>Restaurant Details {id}</h2>
            </div>
        );
    }
}