import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Message from '../features/message/Message'
import styles from '../styles/Home.module.css'
import PostList from './PostList'
import TopNav from './TopNav'
import Sidebar from './Sidebar'
import Profile from './Profile'
import Searchbox from '../features/search/Searchbox'
import FullPost from './FullPost'

const Home = () => {
  const searchboxInvisible = useSelector((state) => state.search.invisible)

  return (
    <Router>
      <div className={styles.container}>
        <TopNav />
        {searchboxInvisible ? '' : <Searchbox />}
        <div className={styles.containerFlex}>
          <Switch>
            <Route exact path="/">
              <PostList />
              <Sidebar />
            </Route>
            <Route exact path="/messages">
              <Message />
            </Route>
            <Route exact path="/:username">
              <Profile />
            </Route>
            <Route exact path="/p/:postId">
              <FullPost />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default Home
