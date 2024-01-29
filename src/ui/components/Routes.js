import React from "react";
import { Route, Switch } from "react-router-dom";
import UsersRequests from "../pages/UsersRequests";
import UserRequest from "../pages/UserRequest";
import UserRewards from "../pages/UserRewards";
import CarsRequests from "../pages/CarsRequests";
import CarRequest from "../pages/CarRequest";
import CarsAproved from "../pages/CarsAproved";
import PassengersAproved from "../pages/PassengersAproved";
import DriversAproved from "../pages/DriversAproved";
import Configurations from "../pages/Configurations";
import TripDetails from "../pages/TripDetails";
import Trips from "../pages/Trips";
import Reservations from "../pages/Reservations";
import NotFound from "../pages/NotFound";
import Inicio from "../pages/Inicio";
import * as ROUTES from "../../bloc/constants/const_routes";
import Intro from "../pages/Intro";
import Milestones from "../pages/Milestones";
import News from "../pages/News";
import Transactions from "../pages/Transactions";
import Groups from "../pages/Groups";
import Profile from "../pages/Profile";

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path={ROUTES.HOME} exact component={Inicio} />
        <Route path={ROUTES.USER_REQUEST} exact component={UsersRequests} />
        <Route
          path={ROUTES.USER_REQUEST + "/:userId"}
          exact
          component={UserRequest}
        />
        <Route
          path={ROUTES.PASSENGER_APPROVED}
          exact
          component={PassengersAproved}
        />
        <Route path={ROUTES.DRIVER_APPROVED} exact component={DriversAproved} />
        <Route path={ROUTES.CAR_REQUEST} exact component={CarsRequests} />
        <Route
          path={ROUTES.CAR_REQUEST + "/:car_Id"}
          exact
          component={CarRequest}
        />
        <Route path={ROUTES.CAR_APPROVED} exact component={CarsAproved} />
        <Route path={ROUTES.SETTINGS} exact component={Configurations} />
        <Route path={ROUTES.TRIPS} exact component={Trips} />
        <Route path={ROUTES.RESERVATIONS} exact component={Reservations} />
        <Route path={ROUTES.TRIPS + "/:tripId"} exact component={TripDetails} />
        <Route path={ROUTES.INTROS} exact component={Intro} />
        <Route path={ROUTES.MILESTONES} exact component={Milestones} />
        <Route path={ROUTES.NEWS} exact component={News} />
        <Route path={ROUTES.TRANSACTIONS} exact component={Transactions} />
        <Route path={ROUTES.GROUPS} exact component={Groups} />
        <Route path={ROUTES.USER_REWARDS} exact component={UserRewards} />

        {/* <Route path={ROUTES.PROFILE} exact component={Profile} /> */}
        <Route
          path={ROUTES.PROFILE + "/:userId/:type"}
          exact
          component={Profile}
        />

        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default Routes;
