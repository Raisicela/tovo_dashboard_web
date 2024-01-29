import React from "react";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../../bloc/Firebase";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBBtn,
  MDBIcon,
  MDBCol,
  MDBRow,
} from "mdbreact";

import UserInformation from "../components/UserInformation";
import DriverInformation from "../components/DriverInformation";

class UsersRequests extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      loading: true,
      error: null,
      appUserRequest: undefined,
    };
  }

  goBack() {
    this.props.history.goBack();
  }

  componentDidMount() {
    this._isMounted = true;
    this.setState({ loading: true, error: null });
    this.props.firebase
      .getAppUser(this.props.match.params.userId)
      .onSnapshot(async (documentSnapshot) => {
        const getData = async () => {
          return documentSnapshot.data();
        };
        getData()
          .then((data) => {
            if (this._isMounted) {
              this.setState({
                appUserRequest: data,
                loading: false,
              });
            }
          })
          .catch((error) => {
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
    if (this.state.loading) {
      return (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          // spacing={3}
        >
          <Grid item xs={1}>
            <CircularProgress />
          </Grid>
        </Grid>
      );
    }
    if (this.state.error) {
      return (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          // spacing={3}
        >
          <Grid item xs={1}>
            <h2>{this.state.error}</h2>
          </Grid>
        </Grid>
      );
    }

    return (
      <MDBCard>
        <MDBCardHeader className="white-text custom_card_header" color="purple">
          <MDBBtn size="sm" color="blue" onClick={this.goBack}>
            <MDBIcon icon="arrow-left" /> Volver
          </MDBBtn>
        </MDBCardHeader>
        <MDBCardBody>
          {/* A title with  */}
          <MDBRow around>
            <h2> Información personal </h2>
          </MDBRow>

          <MDBRow className="py-3 px-3">
            <MDBCol lg="6" md="12">
              <MDBRow center>
                <img
                  className="img_cedula_user"
                  src={
                    this.state.appUserRequest.personalInformation.identification
                      .urlFront
                  }
                  alt="Cédula parte frontal"
                  height="210px"
                  width="280px"
                />
              </MDBRow>

              <MDBRow center>
                <img
                  className="img_cedula_user"
                  src={
                    this.state.appUserRequest.personalInformation.identification
                      .urlBack
                  }
                  alt="Cédula parte trasera"
                  width="280px"
                  height="210px"
                />
              </MDBRow>
            </MDBCol>

            <MDBCol lg="6" md="12">
              <UserInformation data={this.state.appUserRequest} />
            </MDBCol>
          </MDBRow>

          <MDBRow around>
            <h2> Información de conductor </h2>
          </MDBRow>

          <MDBRow className="py-3 px-3">
            <MDBCol lg="6" md="12">
              <MDBRow center>
                <img
                  className="img_cedula_user"
                  src={
                    this.state.appUserRequest.driverInformation.licence.urlFront
                  }
                  height="210px"
                  width="280px"
                  alt="Parte frontal de identificación del conductor"
                />
              </MDBRow>

              <MDBRow center>
                <img
                  className="img_cedula_user"
                  src={
                    this.state.appUserRequest.driverInformation.licence.urlBack
                  }
                  height="210px"
                  width="280px"
                  alt="Parte trasera de identificación del conductor"
                />
              </MDBRow>
            </MDBCol>

            <MDBCol lg="6" md="12">
              <DriverInformation data={this.state.appUserRequest} />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    );
  }
}

export default compose(withRouter, withFirebase)(UsersRequests);
