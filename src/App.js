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
import UploadComp from './upload';
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
  const styles_outer = {
    display: 'table',
    position: 'absolute',
    top: '0',
    left: '0',
    height: '100%',
    width: '100%',
  }
  const styles_middle = {
    display: 'table-cell',
    verticalAlign: 'middle',
  }
  const styles_inner = {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '400px',
  }

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData)
    });
  }, []);

  console.log("user", user)

  return authState === AuthState.SignedIn && user ? (
    <div className="App" style={styles_outer}>
      <div style={styles_middle}>
        <div style={styles_inner}>
          <div style={{ marginBottom: "50px", fontSize: "24px" }}>Hello, {user.attributes.given_name}</div>
          <Router>
            <div>
              <Link to="/">
                <button type="button">Home</button>
              </Link>{' '}
              <Link to={{ pathname: '/Upload' }}>
                <button type="button">Upload Image</button>
              </Link>{' '}
              <Link to={{ pathname: '/Queries' }}>
                <button type="button">Queries</button>
              </Link>{' '}

              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/upload" component={UploadComp} />
                <Route exact path="/queries" component={Queries} />
                <Route render={() => <h1>Page not found</h1>} />
              </Switch>
            </div>
          </Router>
          <div style={{ width: '200px', margin: '0 auto' }}> <AmplifySignOut /> </div>
        </div>
      </div>
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