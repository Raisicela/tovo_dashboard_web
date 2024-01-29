import React from "react";

import {
  MDBAvatar,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBRow,
  toast,
  ToastContainer,
} from "mdbreact";

import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../../bloc/Firebase";

var moment = require("moment");

class UserInformation extends React.Component {
  state = {
    src: "",
    userName: "",
    showEdit: true,
    identificationState:
      this.props.data.personalInformation.identification.status === 3
        ? true
        : false,
    informationState:
      this.props.data.personalInformation.data.status === 3 ? true : false,
  };

  componentDidMount() {
    this.setState({
      src: this.props.data.personalInformation.photo.url,
      name:
        this.props.data.personalInformation.data.name +
        " " +
        this.props.data.personalInformation.data.lastName,
    });
  }

  savePersonalData = () => {
    try {
      this.props.firebase.updatePersonalInformation(this.props.data.userId, {
        dataStatus: this.state.informationState ? 3 : 4,
        identificationStatus: this.state.identificationState ? 3 : 4,
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
      <div>
        <MDBCard testimonial>
          {/* <MDBCardUp color="info" /> */}

          <MDBCardBody>
            <MDBRow>
              <MDBAvatar
                className="mx-auto white"
                tag="img"
                src={this.state.src}
                alt="Sample avatar"
                circle
              />
            </MDBRow>
            <h4 className="font-weight-bold">{this.state.name}</h4>
            <h6>{this.props.data.personalInformation.data.email}</h6>

            <div className="text_align_left">
              <h6>
                {this.props.data.personalInformation.data.city} -{" "}
                {this.props.data.personalInformation.data.province}
              </h6>
              <h6>
                {this.props.data.personalInformation.data.birthDay === null
                  ? ""
                  : moment(
                      this.props.data.personalInformation.data.birthDay.toDate()
                    ).format("DD/MM/YYYY")}
              </h6>
              <h6>
                {this.props.data.personalInformation.data.gender === 0
                  ? "Hombre"
                  : "Mujer"}
              </h6>
              <h6>
                {'"' +
                  this.props.data.personalInformation.data.presentation +
                  '"'}
              </h6>
              <div className="custom-control custom-checkbox text_align_left">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  checked={this.props.data.personalInformation.phone.isValid}
                  disabled
                />
                <label className="custom-control-label">
                  {this.props.data.personalInformation.phone.isValid
                    ? this.props.data.personalInformation.phone
                        .internationalNumber
                    : "Celular no registrado"}
                </label>
              </div>
            </div>

            <hr />

            <div className="text_align_left">
              <h4>Verificar la información personal</h4>
              <MDBInput
                checked={this.state.informationState}
                type="checkbox"
                id="informationState"
                label={
                  this.state.informationState
                    ? "Información personal válida"
                    : "Información personal no válida"
                }
                name="enable2"
                onChange={(e) => {
                  e.persist();
                  this.setState({
                    informationState: e.target.checked,
                  });
                }}
              />
              <MDBInput
                checked={this.state.identificationState}
                type="checkbox"
                id="identificationState"
                label={
                  this.state.identificationState
                    ? "Documento de identidad válido"
                    : "Documento de identidad no válido"
                }
                name="enable1"
                onChange={(e) => {
                  e.persist();
                  this.setState({
                    identificationState: e.target.checked,
                  });
                }}
              />
            </div>

            {/* <hr /> */}

            <MDBBtn color="blue" onClick={this.savePersonalData}>
              Guardar cambios
            </MDBBtn>

            {/* {this.state.showEdit ? (
              <MDBRow between>
                <div></div>
                <h2>
                  {this.props.data.personalInformation.status.verified
                    ? "Verificado"
                    : "No verificado"}
                </h2>
                <MDBBtn
                  color="blue"
                  onClick={() => {
                    this.setState({ showEdit: false });
                  }}
                >
                  Editar
                </MDBBtn>
                <div></div>
              </MDBRow>
            ) : (
              <MDBRow between>
                <div></div>
                <MDBBtn
                  color="green"
                  onClick={() => {
                    try {
                      this.setState({ showEdit: true });
                      this.props.firebase.aprovePersonalInformation(
                        this.props.data.userId
                      );
                      toast.success("Los cambios se guardaron con éxito!", {
                        position: "top-right",
                      });
                    } catch (error) {
                      toast.error(error.message, {
                        position: "top-right",
                      });
                    }
                  }}
                >
                  Verificado
                </MDBBtn>
                <MDBBtn
                  color="red"
                  onClick={() => {
                    try {
                      this.setState({ showEdit: true });
                      this.props.firebase.rejectPersonalInformation(
                        this.props.data.userId
                      );
                      toast.success("Los cambios se guardaron con éxito", {
                        position: "top-right",
                      });
                    } catch (error) {
                      toast.error(error.message, {
                        position: "top-right",
                      });
                    }
                  }}
                >
                  No verificado
                </MDBBtn>
                <div></div>
              </MDBRow>
            )} */}
          </MDBCardBody>
        </MDBCard>
        <ToastContainer
          hideProgressBar={true}
          newestOnTop={true}
          autoClose={5000}
        />
      </div>
    );
  }
}

export default compose(withRouter, withFirebase)(UserInformation);
