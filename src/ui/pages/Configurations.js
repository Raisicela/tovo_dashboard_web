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
  MDBCol,
  MDBRow,
  MDBInput,
  MDBFileInput,
  toast,
  ToastContainer,
} from "mdbreact";

class Configurations extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      configData: undefined,
      file: null,
      validFile: true,
      policyFile: null,
      validPolicyFile: true,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.setState({ loading: true, error: null });
    this.props.firebase
      .getConfigurations()
      .onSnapshot(async (documentSnapshot) => {
        const getData = async () => {
          return documentSnapshot.data();
        };
        getData()
          .then((data) => {
            //console.log(data);

            if (this._isMounted) {
              this.setState({
                configData: data,
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

  handleChange = (e) => {
    if (this._isMounted) {
      this.setState({
        configData: {
          ...this.state.configData,
          [e.target.name]: e.target.value,
        },
      });
    }
  };

  fileInput = (e) => {
    console.log(e[0].type);
    if (e[0].type === "application/pdf") {
      console.log("aceptado");
      this.setState({
        file: e[0],
        validFile: true,
      });
    } else {
      this.setState({
        validFile: false,
      });
    }
  };
  
  filePolicyInput = (e) => {
    console.log(e[0].type);
    if (e[0].type === "application/pdf") {
      console.log("aceptado policy");
      this.setState({
        policyFile: e[0],
        validPolicyFile: true,
      });
    } else {
      this.setState({
        validPolicyFile: false,
      });
    }
  };

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
          <h3 className="deep-grey-text mt-2 mb-1 pb-1 mx-5">
            Configuraciones
          </h3>
        </MDBCardHeader>
        <MDBCardBody>
          <MDBRow>
            <h3>Tarifas de viajes</h3>
          </MDBRow>
          <MDBRow>
            <MDBCol md="3">
              <MDBInput
                label="Comisión por asiento [%]"
                name="commissionSeats"
                group
                value={this.state.configData.commissionSeats}
                type="text"
                size="sm"
                onChange={this.handleChange}
              />
              <MDBInput
                label="Comisión por encomienda [%]"
                name="commissionPackages"
                group
                value={this.state.configData.commissionPackages}
                type="text"
                size="sm"
                onChange={this.handleChange}
              />
            </MDBCol>

            <MDBCol md="3">
              <MDBInput
                label="Tasa para asientos [$/km]"
                name="distanceSeatFee"
                group
                value={this.state.configData.distanceSeatFee}
                type="text"
                size="sm"
                onChange={this.handleChange}
              />
              <MDBInput
                label="Tasa para encomiendas [$/km]"
                name="distancePackageFee"
                group
                value={this.state.configData.distancePackageFee}
                type="text"
                size="sm"
                onChange={this.handleChange}
              />
            </MDBCol>

            <MDBCol md="3">
              <MDBInput
                label="Precio base para asientos [$]"
                name="distanceSeatBase"
                group
                value={this.state.configData.distanceSeatBase}
                type="text"
                size="sm"
                onChange={this.handleChange}
              />
              <MDBInput
                label="Precio base para encomiendas [$]"
                name="distancePackageBase"
                group
                value={this.state.configData.distancePackageBase}
                type="text"
                size="sm"
                onChange={this.handleChange}
              />
            </MDBCol>
            <MDBCol md="3">
              <MDBInput
                label="Distancia min, no comision [km]"
                name="distanceSeatMinFree"
                group
                value={this.state.configData.distanceSeatMinFree}
                type="text"
                size="sm"
                onChange={this.handleChange}
              />
              <MDBInput
                label="Distancia min, no comision [km]"
                name="distancePackageMinFree"
                group
                value={this.state.configData.distancePackageMinFree}
                type="text"
                size="sm"
                onChange={this.handleChange}
              />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol md="12">
              <p>Conductor = (precioBase + distancia*tasa)</p>
              <p>
                Tovo = (precioBase + distancia*tasa)*comision si la distancia es
                superior a la minima
              </p>
              <p>Pasajero = conductor + tovo</p>
            </MDBCol>
          </MDBRow>

          {/* <MDBRow>
            <MDBCol md="6">
              <h5>Tarifas de carpool</h5>
              <MDBInput
                label="Precio por asiento (valor_minimo + valor * distancia)"
                name="carpoolFee"
                group
                value={this.state.configData.carpoolFee}
                type="text"
                size="sm"
                onChange={this.handleChange}
              />
            </MDBCol>

            <MDBCol md="6"></MDBCol>
          </MDBRow> */}
          <MDBRow>
            <h3>Documento de términos y condiciones</h3>
          </MDBRow>

          <MDBRow>
            <MDBCol lg="6">
              <MDBBtn
                color="gren"
                onClick={() => {
                  var url = this.state.configData.termsUrl;
                  window.open(url, "_blank");
                }}
              >
                Ver documento
              </MDBBtn>
            </MDBCol>

            <MDBCol lg="6">
              <MDBFileInput getValue={this.fileInput} />
              {this.state.validFile ? (
                ""
              ) : (
                <div className="red-text">Archivo no válido</div>
              )}
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <h3>Documento de políticas de privacidad</h3>
          </MDBRow>

          <MDBRow>
            <MDBCol lg="6">
              <MDBBtn
                color="gren"
                onClick={() => {
                  var url = this.state.configData.policyUrl;
                  window.open(url, "_blank");
                }}
              >
                Ver documento
              </MDBBtn>
            </MDBCol>

            <MDBCol lg="6">
              <MDBFileInput getValue={this.filePolicyInput} />
              {this.state.validPolicyFile ? (
                ""
              ) : (
                <div className="red-text">Archivo no válido</div>
              )}
            </MDBCol>
          </MDBRow>

          <MDBBtn
            color="primary"
            onClick={async () => {
              toast.info("Guardando...", {
                position: "top-right",
              });

              var path;
              var downloadURL;

              var policyPath;
              var policyDownloadURL;
              try {
                var settings = {
                  commissionPackages: parseFloat(
                    this.state.configData.commissionPackages
                  ),
                  commissionSeats: parseFloat(
                    this.state.configData.commissionSeats
                  ),
                  distancePackageFee: parseFloat(
                    this.state.configData.distancePackageFee
                  ),
                  distanceSeatFee: parseFloat(
                    this.state.configData.distanceSeatFee
                  ),
                  distancePackageBase: parseFloat(
                    this.state.configData.distancePackageBase
                  ),
                  distanceSeatBase: parseFloat(
                    this.state.configData.distanceSeatBase
                  ),
                  distancePackageMinFree: parseFloat(
                    this.state.configData.distancePackageMinFree
                  ),
                  distanceSeatMinFree: parseFloat(
                    this.state.configData.distanceSeatMinFree
                  ),

                  carpoolFee: this.state.configData.carpoolFee,
                  id: this.state.configData.id,
                };

                path = `AppUsers/Settingd/${Date.now()}`;
                if (this.state.file !== null) {
                  if (this.state.configData.termsPath) {
                    console.log("eliminar anterior");
                    try {
                      await this.props.firebase.deleteFile(
                        this.state.configData.termsPath
                      );
                    } catch (error) {
                      console.log(error.message);
                    }
                  }
                  const snapshot = await this.props.firebase.uploadFile(
                    path,
                    this.state.file
                  );
                  downloadURL = await snapshot.ref.getDownloadURL();

                  settings.termsUrl = downloadURL;
                  settings.termsPath = path;
                }

                policyPath = `AppUsers/Settingd/policy${Date.now()}`;
                if (this.state.policyFile !== null) {
                  if (this.state.configData.policyPath) {
                    console.log("eliminar anterior politica de privacidad");
                    try {
                      await this.props.firebase.deleteFile(
                        this.state.configData.policyPath
                      );
                    } catch (error) {
                      console.log(error.message);
                    }
                  }
                  const snapshot = await this.props.firebase.uploadFile(
                    policyPath,
                    this.state.policyFile
                  );
                  policyDownloadURL = await snapshot.ref.getDownloadURL();

                  settings.policyUrl = policyDownloadURL;
                  settings.policyPath = policyPath;
                }

                this.props.firebase.saveSettings(settings);
                toast.success("Información guardada con éxito", {
                  position: "top-right",
                });

                this.setState({
                  file: null,
                });
              } catch (error) {
                toast.warning("Error: " + error.message, {
                  position: "top-right",
                });
                console.log(error.message);
              }
            }}
          >
            Guardar cambios
          </MDBBtn>
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

export default compose(withRouter, withFirebase)(Configurations);
