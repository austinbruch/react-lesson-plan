import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { SomeComponent } from './SomeComponent';
import { MyErrorBoundary } from './MyErrorBoundary';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        
        <SomeComponent text={'Some Text'} />
        <SomeComponent text={'sOmE oThEr TeXt'} />

        {/* Broken SomeComponent */}
        {/* <SomeComponent tetx={'sOmE oThEr TeXt'} /> */}

        {/* Error Boundary impl */}
        {/* <MyErrorBoundary>
          <SomeComponent text={'Some Text'} />
        </MyErrorBoundary>
        <MyErrorBoundary>
          <SomeComponent tetx={'sOmE oThEr TeXt'} />
        </MyErrorBoundary> */}
      </div>
    );
  }
}

export default App;
