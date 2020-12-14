import React, {lazy}  from 'react'
import {Switch, Route} from "react-router-dom"
const SignUp = lazy(() => import("../components/Auth/signup/signup.container"))
const AuthPage = ({match}) => {
  console.log(match)
  return (
    <Switch>
      <Route path={`${match.path}`} component={SignUp}/>
    </Switch>
  )
}

export default AuthPage
