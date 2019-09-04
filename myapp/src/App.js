import React from 'react';
import './App.css'
import {BrowserRouter,Route,Switch} from "react-router-dom";
import Signup from './components/signup';
import Login from './components/login';
import Header from './components/header';
import Footer from './components/footer';
import Timeline from './components/timeline';
import NOTFOUND from './components/notfound';
import SinglePost from './components/singlepost';

class App extends React.Component
{
  
  render(){
    return(  
      <BrowserRouter>
          <Header/> 
          <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Login} />
          <Route path="/singlepost/:id" component={SinglePost}/>
          <Route path="/timeline" component={Timeline}/>
          <Route component={NOTFOUND}/>
          </Switch>
          <Footer/>
      </BrowserRouter>
    );
  }
}



export default App;
