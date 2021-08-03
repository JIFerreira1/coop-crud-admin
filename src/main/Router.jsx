import {
  Switch,
  Redirect,
  Route
} from "react-router-dom";

import { StoreProvider } from '../contexts/Store';

import Login from '../pages/Login';
import RecoveryPassword from "../pages/RecoveryPassword";
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';

const CRouter = () => (
  <Switch>
    <Route exact path="/">
      <Redirect
        to="/login"
      />
    </Route>
    <Route exact path="/login">
      <Login />
    </Route>
    <Route exact path="/recovery-password">
      <RecoveryPassword />
    </Route>
    <Route exact path="/register">
      <Register />
    </Route>
    <Route exact path="/dashboard">
      <StoreProvider>
        <Dashboard />
      </StoreProvider>
    </Route>    
  </Switch>
)

export default CRouter;
