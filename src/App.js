import React  from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavigationBar from './components/layout/NavigationBar/NavigationBar'
import Login from './components/pages/Login/Login'
import Admin from './components/pages/Admin/Admin'
import User from './components/pages/User/User'
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore,  applyMiddleware } from "redux";
import UserStoryGrid from './components/grid/UserStoryGrid';

function App() {

  const store = createStore( ()=>[],
  {}, applyMiddleware() );

  return (
    <React.Fragment>
    <CssBaseline />
    <Provider store={store}>

    <NavigationBar />
    <Router>
    <Switch>
            <Route path="/Admin" type="admin">
              <Admin />
            </Route>
            <Route path="/User"  type="user">
            <User/>
            </Route>
            <Route path="/UserGrid" type="user">
              <UserStoryGrid />
            </Route>
            <Route path="/">
              <Login/>
              </Route> 
          </Switch>
     </Router>
    </Provider>
    
      </React.Fragment>
  );
}

export default App;
