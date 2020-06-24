import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import CreateAssets from './components/Assets/CreateAssets';
import MyAssets from './components/User/MyAssets';
import BuyAssets from './components/Assets/BuyAssets';
import NotFound from './components/NotFound';

import { initApp } from './InitApp';

initApp()

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' render={ () => <Redirect to='/home' component={ Home }/>}/>
        <Route exact path='/home' component={ Home }/>
        <Route exact path='/assets/create' component={ CreateAssets }/>
        <Route exact path='/assets/buy' component={ BuyAssets }/>
        <Route exact path='/users/:user/assets' component={ MyAssets }/>
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
