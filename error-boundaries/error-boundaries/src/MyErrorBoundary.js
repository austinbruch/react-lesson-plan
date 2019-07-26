import React from 'react';

class MyErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            caughtError: false
        };
    }

    static getDerivedStateFromError(error) {
        return {
            caughtError: true
        };
    }

    componentDidCatch(error, info) {
        console.error(error);
    }

    render() {
        if (this.state.caughtError) {
            return (
                <div>
                    {'Some component inside this component encountered an error during a component lifecycle method!'}
                </div>
            );
        } else {
            return this.props.children;
        }
    }
}

export { MyErrorBoundary };
