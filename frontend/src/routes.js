import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewSubject from './pages/NewSubject';
import NewQuestion from './pages/NewQuestion';
import SelectSubject from './pages/SelectSubject';
import Quiz from './pages/Quiz';


export default function Router(){
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={Profile} />
        <Route path="/question/new"  component={NewQuestion} />
        <Route path="/subject/new"  component={NewSubject} />
        <Route path="/quiz/:subject_id" component={Quiz}/>
        <Route path="/select-subject"  component={SelectSubject} />
      </Switch>
    </BrowserRouter>    
  );
}