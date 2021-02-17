import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Hotel from '../pages/Hotel'

const Routes: React.FC = () => (
    <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/hotel/:id' component={Hotel} />
    </Switch>
)

export default Routes