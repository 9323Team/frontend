import React from 'react';

import Home from './pages/home/home'
import Login from './pages/auth/login'
import Signup from './pages/auth/signup'
import Forum from './pages/forum/forum'
import Post from './pages/forum/post/post'
import Works from './pages/works/works'
import Popup from './containers/popup/popup'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";


function App() {
  return (
      <>
      <Popup/>
    <Router>
        <Switch>
            <Redirect exact from="/" to="/home" />
            <Route path="/home" component={Home}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/signup" component={Signup}></Route>
            <Route path="/forum" component={Forum }></Route>
            <Route path="/chatbot" component={Home}></Route>
            <Route path='/how-it-works' component={Works}></Route>
            <Route path='/how-it-works' component={Works}></Route>
            <Route path={`/post/:parameter`} component={Post}></Route>
        </Switch>
            
    </Router>
    </>
  );
}

export default App;