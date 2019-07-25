# react-lesson-plan
Lesson plan for react session for Trilogy Education UNC Full Stack Bootcamp

## Topics for discussion
* Lifecycle methods
* Error Boundaries
* Fragments

## Lifecycle Methods
When you run a react application, everything starts with `ReactDOM.render(<App />, document.getElementById('root'));` or something similar.

What happens here? We're creating (or `construct`ing) an instance of the `App` component, and telling ReactDOM to render that instance of `App` inside of our `#root` element.

From here, React mounts the component instance and our app is up and running. At this point, the lifecycle of the `App` component has started.

Here's a good resource on [React component lifecycle](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/).

In general:
* a component gets constructed
* the component gets mounted
* the component gets rendered
* the component can update 1+ times based on the flow of the app
* the component gets unmounted
* the component gets destroyed

Common lifecycle methods:

### [`constructor`](https://reactjs.org/docs/react-component.html#constructor)
Constructor are functions that are called when you create an instance of a component. This is exactly the same as what we did a few weeks ago with constructor functions. Something like:
```javascript

function Component() {
    ...
}
...
var componentInstance = new Component();
```

The equivalent in JSX is something like this:
```jsx
class Component extends React.Component {
    ...
}
...
const componentInstance = <Component />;
```

In general, constructor functions for React components are _optional_. As you build components, you are not required to give each component a constructor.

Generally, constructors are used if you need to initialize state for the new instance of your component. There's also another use case around binding instance methods/event handlers, but that's becoming less common. State initialization is still prevalent.

Example:
```jsx
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'Hello, world!'
        };
    }

    render() {
        return <div>{this.state.message}</div>;
    }
}
```

One requirement regarding constructors is you _must_ call `super(props)` as the first thing you do, _if_ you choose to implement a constructor in your component. This allows for built-in React component _stuff_ to get setup. This is done automatically if you do not implement a constructor for your component.

### [`render`](https://reactjs.org/docs/react-component.html#render)

### [`componentDidMount`](https://reactjs.org/docs/react-component.html#componentdidmount)

### [`componentDidUpdate`](https://reactjs.org/docs/react-component.html#componentdidupdate)

### [`componentWillUnmount`](https://reactjs.org/docs/react-component.html#componentwillunmount)

## Error Boundaries
What happens when something goes wrong in one of your React components?

## Fragments
