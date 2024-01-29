import React from "react";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../../bloc/Firebase";

import { MDBCard, MDBCardBody } from "mdbreact";
import SectionContainer from "../components/sectionContainer";
import TableFinishedTrips from "../tables/TableFinishedTrips";

class Trips extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      tripsData: [],
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.props.firebase.getFinishedTrips().onSnapshot(async (querySnapshot) => {
      const getData = async () => {
        return Promise.all(
          querySnapshot.docs.map(async (tripDocument) => {
            var driverTrip = tripDocument.data();

            //AppUserReduced for driver
            const driver = await this.props.firebase
              .getAppUser(driverTrip.driverId)
              .get();
            driverTrip.driver = driver.data();

            //driverRoute
            const driverRoute = await this.props.firebase
              .getDriverRouteById(driverTrip.driverRouteId)
              .get();
            driverTrip.driverRoute = driverRoute.data();

            driverTrip.carpoolReservationsList = [];
            // CarpoolReservations
            for (const carpoolReservation in driverTrip.carpoolReservations) {
              const carpoolReservationDoc = await this.props.firebase
                .getCarpoolReservationById(
                  driverTrip.carpoolReservations[carpoolReservation]
                )
                .get();

              driverTrip.carpoolReservationsList.push(
                carpoolReservationDoc.data()
              );
            }
            return Promise.resolve(driverTrip);
          })
        );
      };
      getData()
        .then((data) => {
          if (this._isMounted) {
            this.setState({
              tripsData: data,
              loading: false,
            });
          }
        })
        .catch((error) => {
          console.log(error.message);
          this.setState({
            loading: false,
            error: error.message,
          });
        });
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <SectionContainer title="Viajes finalizados" noBorder>
        <MDBCard>
          <MDBCardBody>
            <TableFinishedTrips
              tripsData={this.state.tripsData}
            ></TableFinishedTrips>
          </MDBCardBody>
        </MDBCard>
      </SectionContainer>
    );
  }
}

export default compose(withRouter, withFirebase)(Trips);
