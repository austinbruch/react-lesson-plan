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

Common lifecycle methods:
* `constructor`
* `render`
* `componentDidMount`
* `componentDidUpdate`
* `componentWillUnmount`

### Student activity
Discuss what you think each of these lifecycle methods do with the people around you.

The general flow of a component:
* a component gets constructed (`constructor`)
* the component gets mounted (`componentDidMount`)
* the component gets rendered (`render`)
* the component can update 1+ times based on the flow of the app (`componentDidUpdate`)
* the component gets unmounted (`componentWillUnmount`)
* the component gets destroyed (no lifecycle method, since the component no longer exists)

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
`componentWillUnmount` is a lifecycle method that gets called when a component is _just about_ to be taken out of the DOM and destroyed. This is the last chance you have to do anything with the component before it's destroyed.

Setting state here `this.setState` will not do anything, since the component is not going to be rendered again.

This is a good opportunity to do any required cleanup associated with the component. React's documentation lists examples like canceling timeouts/intervals or canceling network requests. Both are valid use cases.

```jsx
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.intervalId = window.setInterval(() => {
            // Do something interesting here
            console.log('This message logs out every second');
        }, 1000);
    }
    
    componentWillUnmount() {
        window.clearInterval(this.intervalId);
    }

    render() {
        return (<div>{'There\'s an interval running in the background. Check your console!'}</div>);
    }
}
```

## Error Boundaries
What happens when something goes wrong in one of your React components? Let's look at an example:
```jsx
class App extends React.Component {
    render() {
        return (
            <div>
                <SomeComponent text={'Some Text'} />
                <SomeComponent text={'sOmE oThEr TeXt'} />
            </div>
        );
    }
}

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

ReactDOM.render(<App />, document.getElementById('root'));
```

There's nothing wrong with this example, it will work perfectly fine.
What if we change `App` to look like this:

```jsx
class App extends React.Component {
    render() {
        return (
            <div>
                <SomeComponent text={'Some Text'} />
                <SomeComponent tetx={'sOmE oThEr TeXt'} />
            </div>
        );
    }
}
```

Note that we misspelled the `text` prop on the second instance of `SomeComponent` as `tetx`.

In `SomeComponent.render`, we access `this.props.text` and we also call `this.props.text.toLowerCase()`.

In this case, for the second instance of `SomeComponent`, `this.props.text` is `undefined`, since we passed the prop in as `tetx` instead of `text`. So when accessing `this.props.text`, we get `undefined`. When we call `this.props.text.toLowerCase()`, we're trying to call `toLowerCase()` on `undefined`. JavaScript will throw a runtime error here, since `undefined` does not have a method called `toLowerCase`.

This results in an error during the `render` lifecycle method of the second `SomeComponent` instance.

If you run this in the browser, you'll see that our entire application is gone, nothing is visible any more.

When an error occurs in a lifecycle method of a component, that component is immediately unmounted, AND every parent component, up to the root of the React application _is also unmounted_. More on this below.

This is where _Error Boundaries_ come into play. 

Error boundaries are React components that specifically look for any errors that occur _in any child component_ and give you a chance to execute code in case an unexpected error occurs. Error boundaries give you the chance to render a _fallback UI_ in the case of an error in the React subtree of the error boundary component.

>When an error occurs in a lifecycle method of a component, that component is immediately unmounted, AND every parent component, up to the root of the React application _is also unmounted_,

__UNTIL__ an ancestor component _is an error boundary_. Once an error boundary is reached, the component unmounting is halted.

In other words, error boundary components act as a stopping point for whenever your application breaks at runtime. They "contain the damage" of the broken React tree.

Using error boundaries, you can ensure that if one part of your app breaks, other independent parts _are not affected_. Think about an app like Facebook. If the messenger React tree has some error, should the entire page get unmounted? Probably not. It would be better if just the messenger part went away, and the rest of the app continued to work as normal.

### Implementing an error boundary
Error boundaries are just normal React components, with one exception. A React component becomes an error boundary when it implements either the `componentDidCatch` and/or `getDerivedStateFromError` methods.

```jsx
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
```

In our original example, you would use this error boundary component like this:
```jsx
class App extends React.Component {
    render() {
        return (
            <div>
                <MyErrorBoundary>
                    <SomeComponent text={'Some Text'} />
                </MyErrorBoundary>
                <MyErrorBoundary>
                    <SomeComponent tetx={'sOmE oThEr TeXt'} />
                </MyErrorBoundary>
            </div>
        );
    }
}
```

## [`Fragments`](https://reactjs.org/docs/fragments.html)
Fragments provide a way to return arrays of elements without having to wrap them using a DOM element or some other actual React component.

It is a very common use case to return an array of elements. Think about returning set of list items, or rows in a table. You may make a subcomponent for each list item, or each table row, but you will want to include an array of such elements.

An example:
```jsx
class MyTable extends React.Component {
    render() {
        return (
            <table>
                <th>
                    <MyTableHeaders />
                </th>
            </table>
        );
    }
}

class MyTableHeaders extends React.Component {
    render() {
        return (
            <td>{'Column 1 header'}</td>
            <td>{'Column 2 header'}</td>
        );
    }
}
```

This is invalid, because the return value from `MyTableHeaders.render` returns 2 elements. In JavaScript, you can only return 1 value.

Remember how we talked about using `div`s to group things in the DOM? That is a very common pattern. You could try wrapping the `td`s in a `div`, like this:
```jsx
class MyTableHeaders extends React.Component {
    render() {
        return (
            <div>
                <td>{'Column 1 header'}</td>
                <td>{'Column 2 header'}</td>
            </div>
        );
    }
}
```
That would result in this DOM:
```HTML
<table>
    <th>
        <div>
            <td>Column 1 header</td>
            <td>Column 2 header</td>
        </div>
    </th>
</table>
```
However, this is invalid, since `div` elements are not valid as children within a `table` at this level, this solution does not work.

This is where fragments come in.

Fragments give us a way to group DOM elements and React components _without_ introducing extra DOM layers, like using `div`s does.

We can fix our component like this:
```jsx
class MyTableHeaders extends React.Component {
    render() {
        return (
            <React.Fragment>
                <td>{'Column 1 header'}</td>
                <td>{'Column 2 header'}</td>
            </React.Fragment>
        );
    }
}
```

which results in this DOM:
```HTML
<table>
    <th>
        <td>Column 1 header</td>
        <td>Column 2 header</td>
    </th>
</table>
```
which is what we're after.

There's also a shorthand for Fragments that looks like `<>` and `</>`. Don't be confused, they do the same thing as `<React.Fragment>` and `</React.Fragment>`.

This gets us around JavaScript's limitation of only allowing 1 return value from each function. 
