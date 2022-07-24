// DATABASE=mongodb+srv://yourUsername:yourPassword@cluster0.cyjm4.mongodb.net/ProjectName?retryWrites=true&w=majority

import './css/App.css';
import { createContext, useReducer } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Logout from './components/Logout';
import ErrorPage from './components/ErrorPage';
import { initialState, reducer } from './reducer/useReducer';


// 1: contextAPI
export const UserContext = createContext();

const Routing = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/about">
        <About />
      </Route>

      <Route path="/contact">
        <Contact />
      </Route>

      <Route path="/login">
        <Login />
      </Route>

      <Route path="/signup">
        <SignUp />
      </Route>

      <Route path="/logout">
        <Logout />
      </Route>

      <Route>
        <ErrorPage />
      </Route>
    </Switch>
  )
}

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (

    <>
      <UserContext.Provider value={{state, dispatch}}>

        <Navbar />
        <Routing />

      </UserContext.Provider>
    </>
  )
}

export default App
