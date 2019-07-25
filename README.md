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

One requirement regarding constructors is that you _must_ call `super(props)` as the first thing you do, _if_ you choose to implement a constructor in your component. This allows for built-in React component _stuff_ to get setup. This is done automatically if you do not implement a constructor for your component.

### [`render`](https://reactjs.org/docs/react-component.html#render)

`render` is the only lifecycle method that you are _required_ to implement when you create your own component. This method is what we're already used to using. It defines the content that your component displays/outputs. The return value can be DOM elements like `<input>`, `<div>`, or `<p>`. It can also be other React components e.g. `<App />`, `<MyComponent />`, etc. These elements can be nested arbitrarily deep, just like the regular DOM. You can also return fragments, arrays, strings, numbers, booleans, null, and portals. We will discuss fragments later on. Don't worry about the rest for the time being.

One important rule to follow (which React will warn about if you violate it) is that you should _not_ modify component state directly within your render function. In other words, don't call `this.setState` within `render`.

### [`componentDidMount`](https://reactjs.org/docs/react-component.html#componentdidmount)

`componentDidMount` is how React lets us know when a particular component was first added to the DOM. Sometimes you want to do something when a component is first created. A common use case is loading data from an API when a component mounts. That might look something like this:
```jsx
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serverData: {}
        };
    }

    componentDidMount() {
        // Some fictional utility module that lets us call an API to get data
        apiUtility.getData()
        .then((data) => {
            this.setState({
                serverData: data
            })
        });
    }

    render() {
        return (
            <div>
                {JSON.stringify(this.state.serverData)}
            </div>
        );
    }
}
```

### [`componentDidUpdate`](https://reactjs.org/docs/react-component.html#componentdidupdate)

`componentDidUpdate` gives us a way to execute code whenever the props and/or state have changed. This is not always necessary, but sometimes you may want to do some side effect when part of props or state changes. For example, maybe you need to reload some data from an API if a prop changes e.g. you have an ID of a news article that you need to load passed in as a prop, and as the ID prop changes, you load the next article data.

```jsx
class ArticleViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articleText: ''
        };
    }

    componentDidMount() {
        // Some fictional utility module that lets us call an API to get data
        apiUtility.getData(this.props.articleId)
        .then((data) => {
            this.setState({
                articleText: data
            })
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.articleId !== this.props.articleId) {
            // Only load data if we've switched article IDs
            apiUtility.getData(this.props.articleId)
            .then((data) => {
                this.setState({
                    articleText: data
                })
            });
        }
    }

    render() {
        return (
            <div>
                {this.state.articleText}
            </div>
        );
    }
}
```

One thing to be careful of:
* Don't _always_ update state inside of `componentDidUpdate`. Otherwise you'll end up infinitely looping, as a state update triggers `componentDidUpdate`, which would then trigger another state update, etc. Instead, _conditionally_ update state, only under certain circumstances.

### [`componentWillUnmount`](https://reactjs.org/docs/react-component.html#componentwillunmount)

## Error Boundaries
What happens when something goes wrong in one of your React components?

## Fragments
