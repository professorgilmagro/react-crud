import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import UserList from '../components/user/List'
import UserCreate from '../components/user/Create'
import UserEdit from '../components/user/Edit'

export default props =>
    <Switch>
        <Route exact path='/' component={() => <Home page='home'/>} />
        <Route path='/users/list' component={UserList} />
        <Route path='/users/edit/:id' component={UserEdit} />
        <Route path='/users/create' component={UserCreate} />
        <Redirect from='*' to='/' />
    </Switch>