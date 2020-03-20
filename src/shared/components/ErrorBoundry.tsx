import React from 'react';

interface IProps {
    fallback: any;
    children: any;
}

export default class ErrorBoundary extends React.Component<IProps, {}> {
    state = {
        hasError: null
    };

    static getDerivedStateFromError(error: any) {
        return { hasError: true };
    }

    componentDidCatch(error: any, info: any) {
        console.log(error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <React.Fragment>
                    {this.props.fallback}
                </React.Fragment>
            );
        }

        return this.props.children;
    }
}