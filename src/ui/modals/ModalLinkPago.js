import React from 'react';
import {
  MDBModal,
  MDBInput,
  MDBModalBody,
  MDBBtn,
  MDBCol,
} from "mdbreact";
import Grid from "@material-ui/core/Grid";
import SectionContainer from "../components/sectionContainer";

class ModalLinkPago extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          cardId: this.props.reservation.cardId,
          isPaid: this.props.reservation.isPaid,
          reservation: this.props.reservation,
        };
    }

    componentWillReceiveProps(nextProps) {
      // You don't have to do this check first, but it can help prevent an unneeded render
      if (nextProps.reservation !== this.state.reservation) {
        this.setState({ 
          cardId: nextProps.reservation.cardId,
          isPaid: nextProps.reservation.isPaid,
          reservation: nextProps.reservation,
        });
      }
    }

    onChangePayLink = (e) =>{
      this.setState({
        cardId: e.target.value,
      });
    }

    render(){

        return (
          <MDBModal
            size="lg"
            cascading
            className="modal-avatar w-500"
            isOpen={this.props.modal_open}
            toggle={() => this.props.toggleModal()}
          >
            <MDBModalBody className="text-left">
              <section>
                <SectionContainer header="Enlace de pago">
                  <MDBCol>
                  <MDBInput
                      value={this.state.cardId}
                      onChange={this.onChangePayLink}
                      name="payLink"
                      label="Enlace de pago"
                      type="text"
                  />
                  {this.props.reservation.cardId!==""?<MDBInput 
                    label= {this.state.isPaid ? "Pagado": "Pendiente de pago"} 
                    type="checkbox" 
                    id="checkbox1" 
                    onChange={(e)=>{
                      this.setState({
                        isPaid: e.target.checked,
                      });
                  }}/>:<div></div>}
                  </MDBCol>
                </SectionContainer>

                <Grid container direction = "row" spacing={8} justify="space-around" alignItems = "center">
                  <Grid item xs ={6}>
                    <MDBBtn
                      color="danger"
                      onClick={() => this.props.toggleModal()}
                    >
                      CANCELAR
                    </MDBBtn>
                  </Grid>
                  <Grid item xs ={6}>
                    <MDBBtn
                      color="primary"
                      onClick={() => {
                        this.props.toggleModal();
                        this.props.handleSavePayLink(this.props.reservation.reservationId, this.state.cardId, this.state.isPaid);
                      }}
                    >
                      GUARDAR
                    </MDBBtn>
                  </Grid>
                </Grid>

              </section>
            </MDBModalBody>
          </MDBModal>
        );
    }

}

export default ModalLinkPago;