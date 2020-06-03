import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import Pokemon from './Components/Pokemon/Pokemon';

export default (
    <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='/pokemon/:id' component={Pokemon}/>
    </Switch>
)