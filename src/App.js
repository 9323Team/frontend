import React from 'react';

import Home from './pages/home/home'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";


function App() {
  return (
    <Router>
        <Switch>
            <Redirect exact from="/" to="/home" />
            <Route path="/home" component={Home}></Route>
            

        </Switch>
            
    </Router>
  );
}

export default App;