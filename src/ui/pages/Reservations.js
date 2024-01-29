import React from "react";
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../bloc/Firebase';

import {
    MDBCard,
    MDBCardBody,
  } from "mdbreact";
import SectionContainer from "../components/sectionContainer";
import TableApprovedReservations from '../tables/TableApprovedReservations';
import ModalLinkPago from '../modals/ModalLinkPago';

class Reservations extends React.Component{

    _isMounted = false;
    constructor(props){
        super(props);
        this.state = {
          loading: true,
          error: null,
          reservationsData: [],
          modal_open: false,
          reservation_modal: {
              cardId: "",
              isPaid: false,
          }
        };
    }

    componentDidMount(){
        this._isMounted = true;
        this.props.firebase.getApprovedReservations().onSnapshot(async (querySnapshot)=>{
            const getData = async ()=>{
                return Promise.all(
                querySnapshot.docs.map(async (reservationDocument)=>{
                    var reservation = reservationDocument.data();
                    const appUser = await this.props.firebase.getAppUser(reservation.userId).get();
                    reservation.appUser = appUser.data();
                    return Promise.resolve(reservation);
                })
                )
            }
            getData().then(data=>{
                if (this._isMounted) {
                    this.setState({
                        reservationsData: data,
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

    toggleModal() {
        if (this._isMounted) {
          this.setState({
            modal_open: !this.state.modal_open,
          });
        }
    }

    openReservationLinkModal=(reservation)=> {
        if (this._isMounted) {
          this.setState({
            reservation_modal: reservation,
            modal_open: true,
          });
        }
    }

    render(){
        return(
            <div>
                <SectionContainer title="Manejo de Reservas" noBorder>
                    <h6>Solo reservas que fueron aprobadas por los choferes y están pendientes de pago</h6>
                <MDBCard>
                    <MDBCardBody>
                        <TableApprovedReservations 
                            reservationsData = {this.state.reservationsData}
                            openReservationLinkModal = {this.openReservationLinkModal}
                        > 

                        </TableApprovedReservations>
                    
                    </MDBCardBody>
                </MDBCard>
                </SectionContainer>

                <ModalLinkPago
                    reservation = {this.state.reservation_modal}
                    handleSavePayLink = {(reservationId, cardId, isPaid)=>{
                        this.props.firebase.updateReservationPayment(reservationId, cardId, isPaid);
                    }}
                    toggleModal={() => this.toggleModal()}
                    modal_open = {this.state.modal_open}
                >
                    
                </ModalLinkPago>
            </div>
        );
    }
}

export default compose(withRouter, withFirebase)(Reservations);