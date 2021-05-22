import logo from './logo.svg';
import './App.css';
import { withAuthenticator } from '@aws-amplify/ui-react';
import Upload from './upload';
import Queries from './Queries';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import React from 'react';

const About = () => <h1>Upload</h1>;

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Router>
    <div>
      <Link to="/">Upload Image</Link>{' '}
      <Link to={{pathname: '/Queries'}}>Queries</Link>{' '}
      
      <Switch>
        <Route exact path="/" component={Upload} />
        <Route exact path="/Queries" component={Queries} />
        <Route render={() => <h1>Page not found</h1>} />
      </Switch>
    </div>
  </Router>
      </header>
    </div>
  );
}

// export default App;
export default withAuthenticator(App)