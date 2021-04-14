import React from 'react';
import { Route } from 'react-router-dom'


import './App.css';
import { LandingPage,
         login,
         signup,
         NavigationBar,
         HomePage,
         AccountSettings,
         PrivateRoute,
         } from './components'

function App() {
  return (
    <div className="App">
    <NavigationBar />
    <Route exact path="/" component={LandingPage} />
    <Route path="/login" component={() => <login/>}/>
    <Route path="/signup" component={signup} />
    <Route path="/home" component={HomePage} />
    <PrivateRoute path="/account" component={AccountSettings} />
  </div>
  );
}

export default App;
