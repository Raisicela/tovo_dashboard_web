import React from "react";

import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBBtn,
  toast,
  ToastContainer,
} from "mdbreact";
import DynamicContainer from "./DinamicContainer";

import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../bloc/Firebase';

class CarDataForm extends React.Component {

  _ismounted = false;

  state = {
    brand: "",
    model: "",
    color: "",
    plate: "",
    year: "",
    carState: "",
    stateData: "",
    userOwner: undefined,
    showEdit: true,
  };


  intToRGB = (value) => {
    var blue = Math.floor(value % 256);
    var green = Math.floor(value / 256 % 256);
    var red = Math.floor(value / 256 / 256 % 256);
    return "rgb(" + red + "," + green + "," + blue + ")";
  }

  componentDidMount() {
    this._ismounted = true;
    if (this.props.data.registration.status === 2 ){
      this.setState({
        carState: false,
        stateData: "RECHAZADO",
      });
    }
    if (this.props.data.registration.status === 3 ){
      this.setState({
        carState: false,
        stateData: "APROBADO",
      });
    }
    this.setState({
      brand: this.props.data.information.brand,
      model: this.props.data.information.model,
      color: this.intToRGB(this.props.data.information.color),
      plate: this.props.data.information.plate,
      year: this.props.data.information.year,
    });

    this.props.firebase.getAppUserReduced(this.props.data.user_id).get().then((documentReference)=>{
      if(documentReference.exists){
        var userOwner = documentReference.data();
        if(this._ismounted){
          this.setState({
            userOwner: userOwner,
          })
        }
        
      }
      
    })
  }

  componentWillUnmount(){
    this._ismounted = false;
  }

  render() {
    return (
      <MDBCard>
        <div className="header pt-2 grey lighten-2">
          <MDBRow className="d-flex justify-content-start">
            <h3 className="deep-grey-text mt-2 mb-1 pb-1 mx-5">Datos del vehículo</h3>
          </MDBRow>
        </div>
        <MDBCardBody className="mx-2">
          <MDBRow>
          <MDBCol md = "4" lg="6">
          <h6><strong>Dueño: </strong></h6>
          <h6><strong>Marca: </strong></h6>
          <h6><strong>Modelo: </strong></h6>  
          <h6><strong>Placa: </strong></h6>  
          <h6><strong>Year: </strong></h6>
          <h6><strong>Color:</strong></h6>
          </MDBCol>
          <MDBCol md = "8" lg="6">
          <h6>{this.state.userOwner === undefined ?"":this.state.userOwner.name + " " + this.state.userOwner.lastName}</h6>
          <h6>{this.state.brand || ""}</h6>
          <h6>{this.state.model || ""}</h6>  
          <h6>{this.state.plate || ""}</h6>  
          <h6>{this.state.year || ""}</h6>
          <DynamicContainer bgColor={this.state.color} >
              {/* Choose Background and i will change!!
              <MDBIcon icon="car" size={"2x"}></MDBIcon> */}
          </DynamicContainer>

          </MDBCol>
          </MDBRow>
          <hr></hr>
        
          <div className="text-center mb-4 mt-5">
          {this.state.showEdit?
              <MDBRow between >
                <div></div>
                <h2>
                  {this.props.data.registration.status===2?
                  "Por verificar":this.props.data.registration.status===3?
                  "Verificado":"No verificado"
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
                    this.props.firebase.aproveCarRegistration(this.props.data.car_id, this.props.data.user_id);
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
                    this.props.firebase.rejectPersonalInformation(this.props.data.user_id);
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
          }

            
          </div>
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

export default compose(withRouter, withFirebase)(CarDataForm);




