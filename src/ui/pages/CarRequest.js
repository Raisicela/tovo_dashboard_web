import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../bloc/Firebase';
import Grid from "@material-ui/core/Grid";
import CircularProgress from '@material-ui/core/CircularProgress';

import {
    MDBCard,
    MDBCardHeader,
    MDBBtn,
    MDBIcon,
    MDBCol,
    MDBRow,
    MDBContainer,
  } from "mdbreact";

import CarDataForm from "../components/CarDataForm";

class CarRequest extends React.Component{

    _isMounted = false;
    constructor(props){
        super(props);
        this.goBack = this.goBack.bind(this); 
        this.state = {
          loading: true,
          error: null,
          carRequest: undefined
        };
    }

    goBack(){
        this.props.history.goBack();
    }

    componentDidMount(){
        this._isMounted = true;
        this.setState({loading:true, error:null});
        console.log(this.props.match.params.car_Id);
        this.props.firebase.getCar(this.props.match.params.car_Id).onSnapshot(async (documentSnapshot)=>{
            const getData = async ()=>{
                return documentSnapshot.data();
            }

            getData().then(data=>{
                //console.log(data);

                if (this._isMounted) {
                    this.setState({
                        carRequest: data,
                        loading: false,
                    })
                }
            }).catch((error)=>{
                console.log(error.message)
                this.setState({
                    loading: false,
                    error: error.message
                })
            })
            });
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    render(){

        if(this.state.loading){
            return (
                <Grid container
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
        if(this.state.error){
            return (
                <Grid container
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
            <MDBContainer className="mt-3">
                <MDBRow className="py-3">
                <MDBCol md="12">
                  <MDBCard>
                    <MDBCardHeader className="white-text custom_card_header" color="purple">
                      <MDBBtn
                        size="sm"
                        color="blue"
                        onClick={this.goBack}
                      >
                        <MDBIcon icon="arrow-left" /> Volver
                      </MDBBtn>
                    </MDBCardHeader>
      
                    <MDBRow className="py-3 px-3">
                      <MDBCol lg="6" md="12" className="mb-lg-0 mb-4">
                        <img className = "img_cedula_user border"
                            src = {this.state.carRequest.registration.url_front}
                            alt = "matricula parte frontal"
                        >
                        </img>

                        { this.state.carRequest.registration.photo_url &&
                            <img className = "img_cedula_user mt-2 border"
                                src = {this.state.carRequest.registration.photo_url}
                                alt = "Foto del carro"
                            >
                            </img>
                        }
                      </MDBCol>

      
                      <MDBCol lg="6" md="12">

                         <CarDataForm data = {this.state.carRequest}></CarDataForm> 
                      </MDBCol>
                    </MDBRow>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            
            
            </MDBContainer>
        
        );
    }
}

export default compose(withRouter, withFirebase)(CarRequest);