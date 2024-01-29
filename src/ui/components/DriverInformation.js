import React from "react";

import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBInput,
  toast,
  ToastContainer,
} from "mdbreact";

import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../../bloc/Firebase";

class DriverInformation extends React.Component {
  state = {
    stateBankAccount: false,
    stateCarRegistration: false,
    stateLicence: false,
    stateDriver: false,
    showEdit: true,

    licenceState:
      this.props.data.driverInformation.licence.status === 3 ? true : false,
  };

  componentDidMount() {
    const driverInformation = this.props.data.driverInformation;
    let bankAccount = false;
    let carRegistration = false;
    let licence = false;
    let driver = false;

    if (driverInformation.bank.isComplete) {
      bankAccount = true;
    }

    if (driverInformation.hasCars) {
      carRegistration = true;
    }

    if (driverInformation.licence.status === 3) {
      licence = true;
    }

    if (driverInformation.status.verified) {
      driver = true;
    }
    this.setState({
      stateBankAccount: bankAccount,
      stateCarRegistration: carRegistration,
      stateLicence: licence,
      stateDriver: driver,
    });
  }

  saveDriverData = () => {
    try {
      this.props.firebase.updateDriverInformation(this.props.data.userId, {
        licenceStatus: this.state.licenceState ? 3 : 4,
      });
      toast.success("Los cambios se guardaron con éxito!", {
        position: "top-right",
      });
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
      });
    }
  };

  render() {
    return (
      <MDBCard>
        <div className="header pt-2 grey lighten-2">
          <MDBRow className="d-flex justify-content-center">
            <h3 className="deep-grey-text mt-2 mb-1 pb-1 mx-5">
              Datos conductor
            </h3>
          </MDBRow>
        </div>
        <MDBCardBody className="mx-2">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              checked={this.state.stateBankAccount}
              disabled
            />
            <label className="custom-control-label">
              Cuenta de banco registrada
            </label>
          </div>
          <hr />

          <div className="text_align_left">
            <h4>Verificar la información de conductor</h4>
            <MDBInput
              checked={this.state.licenceState}
              type="checkbox"
              id="licenseState"
              label={
                this.state.licenceState
                  ? "Licencia de conducir verificada"
                  : "Licencia de conducir no verificada"
              }
              name="enable3"
              onChange={(e) => {
                e.persist();
                console.log("checked", e.target.checked);
                this.setState({
                  licenceState: e.target.checked,
                });
              }}
            />

            <MDBBtn color="blue" onClick={this.saveDriverData}>
              Guardar cambios
            </MDBBtn>
          </div>

          {/* 
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              checked={this.state.stateCarRegistration}
              disabled
            />
            <label className="custom-control-label">Vehículo registrado</label>
          </div> */}
          {/* <hr />
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              checked={this.state.stateLicence}
              disabled
            />
            <label className="custom-control-label">Licencia verificada</label>
          </div> */}
          <hr />
          {/* {this.state.stateDriver ? (
            <p className="dark-grey-text text-center">Conductor verificado</p>
          ) : (
            <MDBBtn color = "green">
              Aprobar licencia
            </MDBBtn>
          )} */}

          {/* {this.state.showEdit?
              <MDBRow between >
                <div></div>
                <h2>
                  {this.props.data.driverInformation.status.verified?
                  "Verificado":
                  "No verificado"
                  }
                </h2>
                <MDBBtn color = "blue" onClick = {()=>{
                  this.setState({showEdit:false});
                    }}>
                  Editar
                </MDBBtn>
                <div></div>
              </MDBRow>:
              <MDBRow between>
                <div></div>
                <MDBBtn color = "green" onClick = {()=>{
                  try{
                    this.setState({showEdit:true});
                    this.props.firebase.aproveDriverInformation(this.props.data.userId);
                    toast.success("Los cambios se guardaron con éxito!", {
                      position: 'top-right'
                    });
                  }catch(error){
                    toast.error(error.message, {
                      position: 'top-right'
                    });
                  }
                  }}>
                      Verificado
                </MDBBtn>
                <MDBBtn color = "red" onClick = {()=>{
                  try{
                    this.setState({showEdit:true});
                    this.props.firebase.rejectDriverInformation(this.props.data.userId);
                    toast.success("Los cambios se guardaron con éxito", {
                      position: 'top-right'
                    });
                  }catch(error){
                    toast.error(error.message, {
                      position: 'top-right'
                    });
                  }
                    
                  }}>
                      No verificado
                </MDBBtn>
                <div></div>
              </MDBRow>
          } */}
        </MDBCardBody>

        <ToastContainer
          hideProgressBar={true}
          newestOnTop={true}
          autoClose={5000}
        />
      </MDBCard>
    );
  }
}

export default compose(withRouter, withFirebase)(DriverInformation);
