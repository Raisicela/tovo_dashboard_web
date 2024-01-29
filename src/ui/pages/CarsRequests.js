import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../bloc/Firebase';
import Grid from "@material-ui/core/Grid";
import CircularProgress from '@material-ui/core/CircularProgress';

import {
    MDBCard,
    MDBCardBody,
  } from "mdbreact";

import TableCarsRequests from '../tables/TableCarsRequests';
import SectionContainer from "../components/sectionContainer";

class CarsRequests extends React.Component{

    _isMounted = false;
    constructor(props){
        super(props);
        this.state = {
          loading: true,
          error: null,
          carsRequest: []
        };
    }


    componentDidMount(){
        this._isMounted = true;
        this.setState({loading:true, error:null});
        this.props.firebase.getCarsRequests().onSnapshot(async (querySnapshot)=>{
            const getData = async ()=>{
                return Promise.all(
                querySnapshot.docs.map(async function(carDocument){
                    var car = carDocument.data();
                    return Promise.resolve(car);
                })
                )
            }
            getData().then(data=>{

                if (this._isMounted) {
                    this.setState({
                        carsRequest: data,
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
            <SectionContainer title="Registro de vehículos" noBorder>
              <MDBCard>
                <MDBCardBody>
                    <TableCarsRequests carsRequest = {this.state.carsRequest}> 

                    </TableCarsRequests>
                  
                </MDBCardBody>
              </MDBCard>
            </SectionContainer>
        );
    }
}

export default compose(withRouter, withFirebase)(CarsRequests);