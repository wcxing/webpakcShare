import React from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import AsyncComponent from '../common/util/AsyncComponent'

// const Login = AsyncComponent(() => import('../page/login/index.js'))
import Login from '../page/login/index.js'
const Home = AsyncComponent(() => import('../page/home/index.js'))
// import Home from '../page/home/index.js'

export default () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/" component={Home} />
            </Switch>
        </div>
    </BrowserRouter>
  )
