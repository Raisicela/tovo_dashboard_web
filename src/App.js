import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Login from "./ui/pages/Login";
import * as ROUTES from "./bloc/constants/const_routes";
import RoutesWithNavigation from "./ui/components/RoutesWithNavigation";
import { withAuthentication } from './bloc/Session';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={ROUTES.SIGN_IN} component={Login}/>
        <RoutesWithNavigation />
      </Switch>
    </BrowserRouter>
  );
}

export default withAuthentication(App);
