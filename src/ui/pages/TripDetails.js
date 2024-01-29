import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../bloc/Firebase';
import Grid from "@material-ui/core/Grid";
import CircularProgress from '@material-ui/core/CircularProgress';

import {
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBBtn,
    MDBIcon,
    MDBCol,
    MDBRow,
    toast,
    ToastContainer,
  } from "mdbreact";
  import Dropzone from "../components/ChooseImage";

class TripDetails extends React.Component{

    _isMounted = false;
    constructor(props){
        super(props);
        this.goBack = this.goBack.bind(this); 
        this.state = {
          loading: true,
          error: null,
          tripData: undefined,
          voucherFile: null,
          voucherUrlLocal: null,
        };
    }

    goBack(){
        this.props.history.goBack();
    }

    componentDidMount(){
        this._isMounted = true;
        this.setState({loading:true, error:null});

        this.props.firebase.getTrip(this.props.match.params.tripId).onSnapshot(async (documentSnapshot)=>{
            const getData = async ()=>{

                var trip = documentSnapshot.data();
                const reservations = await this.props.firebase.getReservationsFromTrip(trip.tripId).get();
                trip.reservationsList = [];
                reservations.forEach(res => {
                    trip.reservationsList.push(res.data());
                });

                const driver = await this.props.firebase.getAppUser(trip.userId).get();
                trip.driver = driver.data();

                return trip;
            }
            getData().then(data=>{
                //console.log(data);

                if (this._isMounted) {
                    this.setState({
                        tripData: data,
                        voucherUrlLocal: data.collected.voucherUrl,
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

    fileInputHandler = (file) => {
        if (this.state.voucherFile !== file) {
          if (this._isMounted) {
            this.setState({
                voucherFile: file,
                voucherUrlLocal: URL.createObjectURL(file),
            });
          }
        }
    };

    saveVoucher = async()=> {
        toast.info("Guardando el voucher", {
        position: "top-right",
        });
    
        var path;
        var downloadURL;
        try {
            path = `AppUsers/${this.state.tripData.userId}/Vouchers/${Date.now()}`;
            if (this.state.voucherFile !== null) {
                
                if (this.state.tripData.collected.voucherPath) {
                    console.log("eliminar anterior");
                    try{
                        await this.props.firebase.deleteFile(this.state.tripData.collected.voucherPath);
                    }
                    catch(error){
                        console.log(error.message);
                    }
                }
                const snapshot = await this.props.firebase.uploadFile(path,this.state.voucherFile);
                downloadURL = await snapshot.ref.getDownloadURL();
            }

            await this.props.firebase.updateTripVoucher(this.state.tripData.tripId, downloadURL, path);
    
            toast.success("Voucher guardado con éxito", {
                position: "top-right",
            });

            this.setState({
                voucherFile: null,
            })
        } catch (error) {
        toast.warning("Error: " + error.message, {
            position: "top-right",
        });
        console.log(error.message);
        }
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

        var totalConductor = 0.0;
        var totalTovo =  0.0;
        var totalCliente =  0.0;

        return (

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
                <MDBCardBody>

                <MDBRow className="py-3 px-3">
                    <MDBCol lg="6" md="12" >
                        <h3>Chofer</h3>
                        <p>{this.state.tripData.driver.personalInformation.data.name}  {this.state.tripData.driver.personalInformation.data.lastName} <br/>
                            {this.state.tripData.driver.personalInformation.phone.internationalNumber}
                        </p>

                        <h3>Vehículo</h3>
                        <p>{this.state.tripData.details.car.brand} - {this.state.tripData.details.car.model} <br/>
                            {this.state.tripData.details.car.year}
                        </p>
                    </MDBCol>

                    <MDBCol lg="6" md="12">
                        <h3>Desde</h3>
                        <p>{this.state.tripData.details.startAddress.city + " - " + this.state.tripData.details.startAddress.province} <br/>
                            {this.state.tripData.details.startAddress.name}</p>
                        <h3>Hasta</h3>
                        <p>{this.state.tripData.details.finishAddress.city + " - " + this.state.tripData.details.finishAddress.province} <br/>
                            {this.state.tripData.details.finishAddress.name}</p>
                    </MDBCol>
                </MDBRow>

                <MDBRow className="py-3 px-3">
                    <MDBCol lg="12" md="12" >
                        <h2>Reservas</h2>
                        <p>Reservas confirmadas: {this.state.tripData.reservationsList.length}</p>
                        <table className = "custom_table">
                        <thead className = "custom_td ">
                        <tr className = "custom_header">
                            <th>No.</th>
                            <th>Reserva</th>
                            <th>Espacios</th>
                            <th>Conductor</th>
                            <th>Tovo</th>
                            <th>Cliente</th>
                            <th>Total conductor</th>
                            <th>Total tovo</th>
                            <th>Total cliente</th>
                        </tr>
                        </thead>

                        <tbody className = "custom_td custom_th">
                        {this.state.tripData.reservationsList.map((reservation, index)=>{
                            var isPassenger = reservation.type===1;
                            var cantidadEspacios = reservation.information.quantity;
                            var parteConductor;
                            var totalParteConductor;
                            var parteTovo;
                            var totalParteTovo;

                            var pagadoClienteUnitario = reservation.information.unitPrice;
                            var pagadoClienteTotal = reservation.information.totalPrice;

                            if(isPassenger){
                                parteConductor = this.state.tripData.price.seats.driver;
                                parteTovo = this.state.tripData.price.seats.commission;
                            }else{
                                parteConductor = this.state.tripData.price.parcels.driver;
                                parteTovo = this.state.tripData.price.parcels.commission;
                            }

                            totalParteConductor = (parteConductor * cantidadEspacios).toFixed(2);
                            totalParteTovo = (parteTovo * cantidadEspacios).toFixed(2);

                            totalConductor += parteConductor * cantidadEspacios;
                            totalTovo += parteTovo * cantidadEspacios;
                            totalCliente += pagadoClienteTotal;

                            return <tr key={index}>
                                        <td>{index + 1}. </td>
                                        <td>{isPassenger?"Asiento ":"Encomienda "}</td>
                                        <td>{cantidadEspacios}</td>
                                        <td>{parteConductor}</td>
                                        <td>{parteTovo}</td>
                                        <td>{pagadoClienteUnitario}</td>
                                        <td>{totalParteConductor}</td>
                                        <td>{totalParteTovo}</td>
                                        <td>{pagadoClienteTotal}</td>
                                    </tr>
                        })}
                            <tr key={-1}>
                                <td> </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><strong>{totalConductor.toFixed(2)}</strong></td>
                                <td>{totalTovo.toFixed(2)}</td>
                                <td>{totalCliente.toFixed(2)}</td>
                            </tr>
                        </tbody>
                        </table>

                    </MDBCol>



                    {/* <MDBCol lg="12" md="12">
                        <h2>Precios</h2>
                    </MDBCol> */}
                </MDBRow>

                <MDBRow>
                    <MDBCol lg="6" md="12">
                        <h3>Cuenta bancaria</h3>
                        <p>{this.state.tripData.driver.driverInformation.bank.name}  - { this.state.tripData.driver.driverInformation.bank.type===0?"Ahorros":"Corriente"} <br/>
                            {this.state.tripData.driver.driverInformation.bank.account}</p>
                    </MDBCol>

                    <MDBCol lg="6" md="12">
                        <h3><strong>Pagar al conductor: ${totalConductor.toFixed(2)}</strong> </h3>
                        <Dropzone
                            photoUrl={this.state.voucherUrlLocal}
                            inputHandler={this.fileInputHandler}
                        ></Dropzone>
                        {this.state.voucherFile!==null?
                            <MDBBtn color="green" onClick={this.saveVoucher}>
                                Guardar el comprobante
                            </MDBBtn>:
                            <Grid></Grid>
                        }
                    </MDBCol>
                    
                </MDBRow>
                  
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

export default compose(withRouter, withFirebase)(TripDetails);