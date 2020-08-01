import React, { Component,useState,useEffect }  from 'react';

import Home from './pages/home/home'
import Login from './pages/auth/login'
import Signup from './pages/auth/signup'
import Forum from './pages/forum/forum'
import Post from './pages/forum/post/post'
import Works from './pages/works/works'
import Popup from './containers/popup/popup'
import Chatbot from './components/chatbot/chatbot'
import Bot from './containers/bot/bot'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";


function App() {
  let [chatFlag,setChat] = useState(false);
  let [robotFlag,setRobot] = useState(true);
  useEffect( ()=>{
    
    
  },[chatFlag, robotFlag]);

  function showHide(data){

    setChat(true)
    setRobot(false)
    
  }
  function setChildData(data){
      setChat(data)
      setRobot(true)

  }
  return (
      <>
      <Popup/>
      {robotFlag && <Bot showHide={showHide}/> }
      {chatFlag && <Chatbot setChildData ={setChildData}/>}
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