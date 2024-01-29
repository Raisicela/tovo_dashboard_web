import React from "react";
import {
//   MDBContainer,
  MDBBtn,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBCol,
  MDBRow,
} from "mdbreact";
//import Dropzone from "../components/ChooseImage";

class TransactionsModal extends React.Component{

    // constructor(props){
    //     super(props);
    // }
    
    render(){
        return (
          <MDBModal
            size="lg"
            cascading
            className="modal-avatar w-500"
            isOpen={this.props.modal_open}
            toggle={() => {
              this.props.toggleModal();
            }}
            modalStylesWithoutBackdrop={{ position: "static"}}
            wrapClassName="w-200"
          >
           
            <MDBModalBody>
              <section>
                <MDBRow style={{paddingTop:"20px"}}>
                  <MDBCol md="6" lg="6">
                    <img
                      src={this.props.transactions_modal.photoUrl}
                      alt={this.props.transactions_modal.transactionsId}
                      width = "350px"
                    />
                  </MDBCol>
                  
                  <MDBCol md="6" lg="6" >
                    <MDBRow>
                      <MDBCol md="12" lg="12">
                        <MDBInput
                          value={this.props.transactions_modal.value}
                          name="value"
                          onChange={this.props.handleChange}
                          type="textarea"
                          id="value"
                          label="Valor(Editar en centavos)"
                          required
                        >
                        </MDBInput>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow style={{paddingTop:"20px"}}>
                      <MDBInput
                        checked={this.props.transactions_modal.status===3}
                        type="checkbox"
                        id="check state"
                        label={
                          this.props.transactions_modal.status===1?"pendiente":this.props.transactions_modal.status===2?"Recarga rechazada":this.props.transactions_modal.status===3?"Recarga aprobada":""
                        }
                        name="status"
                        onChange={(e) => {
                          e.persist();
                          this.props.updateEnable(e.target.checked);
                          
                        }}
                      ></MDBInput>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>
    
                <MDBRow className="d-flex text-center">
                  <MDBCol md="6" className="mt-2 mb-4">
                    <MDBBtn color="danger" onClick={() => this.props.toggleModal()}>
                      CANCELAR
                    </MDBBtn>
                  </MDBCol>
                  <MDBCol md="6" className="mt-2 mb-4">
                    <MDBBtn
                      color="primary"
                      onClick={() => {
                        this.props.toggleModal();
                        this.props.handleSaveTransactions();
                      }}
                      disabled={
                          !this.props.transactions_modal.userId||this.props.transactions_modal.userId===""
                        }
                    >
                      GUARDAR
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
              </section>
            </MDBModalBody>
          </MDBModal>
        );
      };

}

export default TransactionsModal;