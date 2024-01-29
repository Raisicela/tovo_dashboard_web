import React from "react";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../../bloc/Firebase";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

import { MDBCard, MDBCardBody } from "mdbreact";

import TableUsersRedeemReward from "../tables/TableUsersRedeem";
import SectionContainer from "../components/sectionContainer";

class UserRewards extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      redeemRewardsList: [],
    };
  }

  getAppUser = async (userId) => {
    const userDoc = await this.props.firebase.getAppUser(userId).get();
    return userDoc.data();
  };

  componentDidMount() {
    this._isMounted = true;
    this.setState({ loading: true, error: null });
    this.props.firebase
      .getAllRedeemRewards()
      .onSnapshot(async (querySnapshot) => {
        const getData = async () => {
          return Promise.all(
            querySnapshot.docs.map(async (redeemRewardDoc) => {
              var redeemReward = redeemRewardDoc.data();
              const appUser = await this.getAppUser(redeemReward.userId);
              redeemReward.appUser = appUser;

              return Promise.resolve(redeemReward);
            })
          );
        };
        getData()
          .then((data) => {
            if (this._isMounted) {
              console.log(data);
              this.setState({
                redeemRewardsList: data,
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
      <SectionContainer title="Recompensas a usuarios" noBorder>
        <MDBCard>
          <MDBCardBody>
            <TableUsersRedeemReward
              redeemRewardsList={this.state.redeemRewardsList}
            ></TableUsersRedeemReward>
          </MDBCardBody>
        </MDBCard>
      </SectionContainer>
    );
  }
}

export default compose(withRouter, withFirebase)(UserRewards);
