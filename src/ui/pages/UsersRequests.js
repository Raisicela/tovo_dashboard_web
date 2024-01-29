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

import TableUserRequests from '../tables/TableUserRequests';
import SectionContainer from "../components/sectionContainer";

class UsersRequests extends React.Component{

    _isMounted = false;
    constructor(props){
        super(props);
        this.state = {
          loading: true,
          error: null,
          appUsersRequest: []
        };
    }


    componentDidMount(){
        this._isMounted = true;
        this.setState({loading:true, error:null});
        this.props.firebase.getAllAppUsers().onSnapshot(async (querySnapshot)=>{
            const getData = async ()=>{
                return Promise.all(
                querySnapshot.docs.map(async function(usersDocument){
                    var appUser = usersDocument.data();
                    return Promise.resolve(appUser);
                })
                )
            }
            getData().then(data=>{
                var filteredData = [];
                data.forEach((appUser)=>{
                    //if(appUser.driverInformation.status.verificationRequest || appUser.personalInformation.status.verificationRequest){
                        filteredData.push(appUser);
                    //}
                });

                if (this._isMounted) {
                    this.setState({
                        appUsersRequest: filteredData,
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
            <SectionContainer title="Usuarios" noBorder>
              <MDBCard>
                <MDBCardBody>
                    <TableUserRequests usersRequest = {this.state.appUsersRequest}> 

                    </TableUserRequests>
                  
                </MDBCardBody>
              </MDBCard>
            </SectionContainer>
        );
    }
}

export default compose(withRouter, withFirebase)(UsersRequests);