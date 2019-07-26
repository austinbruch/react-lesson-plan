import React from 'react';

class SomeComponent extends React.Component {
    render() {
        return (
            <div>
                <div>{'Original text: '}{this.props.text}</div>
                <div>{'Lowercase text: '}{this.props.text.toLowerCase()}</div>
            </div>
        );
    }
}

export { SomeComponent };
