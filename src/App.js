// import { Auth } from 'aws-amplify';
// import logo from './logo.svg';
// import {SignIn} from 'aws-amplify-react'
// import { withAuthenticator } from '@aws-amplify/ui-react';
// export default App;
// export default withAuthenticator(App)

import React from 'react';
import './App.css';
import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignOut, AmplifySignIn, AmplifySignUp } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from './aws-exports';
import Upload from './upload';
import Queries from './Queries';
import Home from './home';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';

Amplify.configure(awsconfig);

const AuthStateApp = () => {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData)
    });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <div className="App">
      <div>Hello, {user.username}</div>
      <Router>
        <div>
          <Link to="/">Home</Link>{' '}
          <Link to={{ pathname: '/Upload' }}>Upload Image</Link>{' '}
          <Link to={{ pathname: '/Queries' }}>Queries</Link>{' '}

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/upload" component={Upload} />
            <Route exact path="/queries" component={Queries} />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </div>
      </Router>
      <div style={{width:'200px', margin:'0 auto'}}> <AmplifySignOut /> </div>
    </div>
  ) : (
    <AmplifyAuthenticator usernameAlias="email">
      <AmplifySignUp
        slot="sign-up"
        usernameAlias="email"
        formFields={[
          {
            type: "email",
            label: "Custom Email Label",
            placeholder: "Custom email placeholder",
            inputProps: { required: true, autocomplete: "username" },
          },
          {
            type: "password",
            label: "Custom Password Label",
            placeholder: "Custom password placeholder",
            inputProps: { required: true, autocomplete: "new-password" },
          },
          {
            type: "given_name",
            label: "Custom given_name",
            placeholder: "Custom given_name",
          },
          {
            type: "family_name",
            label: "Custom family_name",
            placeholder: "Custom family_name",
          },
        ]}
      />
      <AmplifySignIn slot="sign-in" usernameAlias="email" />
    </AmplifyAuthenticator>
  );
}

export default AuthStateApp;