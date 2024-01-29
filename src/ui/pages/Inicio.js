import React, { Component } from "react";
import { MDBBtn, MDBCol, MDBRow } from "mdbreact";
import { compose } from "recompose";
import { withFirebase } from "../../bloc/Firebase";
import { withAuthorization, withEmailVerification } from "../../bloc/Session";

class Inicio extends Component {
  state = {
    buttonStyle: {
      transform: "scaleY(0.4) scaleX(0.4) translateY(40px) translateX(0)",
      opacity: "0",
    },
  };

  render() {
    return (
      <>
        <section>
          <MDBRow>
            <h3>Dashboard</h3>
          </MDBRow>
          <MDBRow>
            <MDBCol>
              <MDBBtn
                color="gren"
                onClick={() => {
                  var url =
                    "https://analytics.google.com/analytics/web/?authuser=0&hl=es#/p257076450/reports/dashboard?r=firebase-overview";
                  window.open(url, "_blank");
                }}
              >
                Ir al dashboard en analytics
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </section>
      </>
    );
  }
}

//condicion: existe un usuario logeado y en la bdd tiene asiganado admin en true
const condition = (authUser) => authUser && !!authUser.admin;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
  withFirebase
)(Inicio);
