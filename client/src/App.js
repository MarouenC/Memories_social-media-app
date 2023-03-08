import React from 'react';
import {Container} from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import {Navbar, Home, Auth, PostDetails} from './components'

const App = () => {

  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <GoogleOAuthProvider clientId="78570190375-mntoka6b6goili0il96e6nib126c7fbg.apps.googleusercontent.com">
      <BrowserRouter>
        <Container maxWidth="xl">
          <Navbar />
          <Switch>
            <Route path="/" exact component={() => <Redirect to="/posts" />} />
            <Route path="/posts" exact component={Home} />
            <Route path="/posts/search" exact component={Home} />
            <Route path="/posts/:id" exact component={PostDetails} />
            <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
          </Switch>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App