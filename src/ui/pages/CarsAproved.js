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

import TableCarsAproved from '../tables/TableCarsAproved';
import SectionContainer from "../components/sectionContainer";

class CarsAproved extends React.Component{

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
        this.props.firebase.getAprovedCars().onSnapshot(async (querySnapshot)=>{
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
            <SectionContainer title="Vehículos aprobados" noBorder>
              <MDBCard>
                <MDBCardBody>
                    <TableCarsAproved carsRequest = {this.state.carsRequest}> 

                    </TableCarsAproved>
                  
                </MDBCardBody>
              </MDBCard>
            </SectionContainer>
        );
    }
}

export default compose(withRouter, withFirebase)(CarsAproved);