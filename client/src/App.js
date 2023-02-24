import React from 'react';
import {Container} from '@material-ui/core';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import {Navbar, Home, Auth} from './components'

const App = () => {
  return (
    <GoogleOAuthProvider clientId="78570190375-mntoka6b6goili0il96e6nib126c7fbg.apps.googleusercontent.com">
      <BrowserRouter>
        <Container maxWidth="lg">
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/auth" exact component={Auth} />
          </Switch>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App