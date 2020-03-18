import React from 'react';

interface IProps {
    render: Function;
    children: any;
}

export default class ErrorBoundary extends React.Component<IProps, {}> {
    state = {
        error: null,
        info: null
    };

    componentDidCatch(error: any, info: any) {
        this.setState({
            error,
            info
        });
    }

    render() {
        if (this.state.error) {
            return this.props.render && this.props.render(this.state);
        }

        return this.props.children;
    }
}