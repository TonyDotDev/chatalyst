import React from 'react';
import { Switch, Route } from 'react-router-dom';
import socketClient from 'socket.io-client';

import Header from './components/Header/Header';
import Landing from './components/Landing/Landing';
import Chat from './components/Chat/Chat';

import 'normalize.css';
import './App.scss';

const io = socketClient.connect('localhost:8000');

const App = () => (
  <div className="app">
    <Header io={io} />
    <Switch>
      <Route exact path="/" render={() => <Landing io={io} />} />
      <Route path="/chat" render={() => <Chat io={io} />} />
      {/* <Route path="/about" component={Chat} /> */}
    </Switch>
  </div>
);

export default App;
