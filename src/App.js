import React from 'react';

import Home from './pages/home/home'
import Login from './pages/auth/login'
import Signup from './pages/auth/signup'
import Forum from './pages/forum/forum'
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
            <Route path='/how-it-works' component={Home}></Route>
        </Switch>
            
    </Router>
    </>
  );
}

export default App;