import {
  Switch,
  Redirect,
  Route
} from "react-router-dom";

import { StoreProvider } from '../contexts/Store';
import { SnackbarProvider } from 'notistack';

import Login from '../pages/Login';
import RecoveryPassword from "../pages/RecoveryPassword";
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import EditStore from '../pages/EditStore';
import CreateStore from '../pages/CreateStore';

import { isAuthenticated } from '../services/auth'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route 
    {...rest} 
    render={props => 
    isAuthenticated() !== null ? (
      <Component { ...props } />
    ) : (
      <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )
  } />
)

const CRouter = () => (
  <Switch>
    <Route exact path="/" component={() => <Redirect to="/login"/>} />
    <Route exact path="/login" component={() => <SnackbarProvider maxSnack={3}><Login /></SnackbarProvider>} />
    <Route exact path="/recovery-password" component={() => <SnackbarProvider maxSnack={3}><RecoveryPassword /></SnackbarProvider>}/>
    <Route exact path="/register" component={() => <SnackbarProvider maxSnack={3}><Register /></SnackbarProvider>}/>
    <PrivateRoute exact path="/dashboard" component={() => <StoreProvider><Dashboard /></StoreProvider>}/>
    <PrivateRoute exact path="/edit-store" component={() => <StoreProvider><EditStore /></StoreProvider>} />
    <PrivateRoute exact path="/create-store" component={() => <StoreProvider><CreateStore /></StoreProvider>} />
  </Switch>
)

export default CRouter;
