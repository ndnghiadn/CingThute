import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import Spinner from './components/Spinner'
import { getUser } from './features/auth/authSlice'
import Login from './features/auth/Login'
import Register from './features/auth/Register'

function App() {
  const user = useSelector((state) => state.auth.user)

  const loadingState = useSelector((state) => state.auth.loading)

  const dispatch = useDispatch()

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
      dispatch(getUser())
    }
  }, [dispatch])

  return (
    <Router>
      {loadingState ? (
        <Route path="*">
          <Spinner />
        </Route>
      ) : (
        ''
      )}
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Login />}
        </Route>
        <Route exact path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
