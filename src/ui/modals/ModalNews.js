import React from "react";
import {
//   MDBContainer,
  MDBBtn,
  MDBInput,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBCol,
  MDBRow,
} from "mdbreact";
import Dropzone from "../components/ChooseImage";

class NewsModal extends React.Component{

    // constructor(props){
    //     super(props);
    // }
    
    render(){
        return (
          <MDBModal
            size="md"
            cascading
            className="modal-avatar w-500"
            isOpen={this.props.modal_open}
            toggle={() => {
              this.props.toggleModal();
            }}
            modalStylesWithoutBackdrop={{ position: "static" }}
            wrapClassName="w-200"
          >
            <MDBModalHeader className="mx-auto">
              <Dropzone
                photoUrl={
                    this.props.news_modal.photoUrlLocal
                }
                inputHandler={this.props.fileInputHandler}
              ></Dropzone>
            </MDBModalHeader>
    
            <MDBModalBody>
              <section>
                <MDBRow>
                  <MDBCol md="12" lg="12">
                    <MDBInput
                      value={this.props.news_modal.title}
                      name="title"
                      onChange={this.props.handleChange}
                      type="textarea"
                      id="title"
                      label="Titulo"
                      required
                    >
                    </MDBInput>
                    
                    <MDBInput
                      value={this.props.news_modal.content}
                      name="content"
                      onChange={this.props.handleChange}
                      type="textarea"
                      id="content"
                      label="Contenido"
                      rows="5"
                      required
                      
                    >
                    </MDBInput>
                    
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBInput
                    checked={this.props.news_modal.enable}
                    type="checkbox"
                    id="check enable"
                    label={
                      this.props.news_modal.enable
                        ? "Noticia habilitada"
                        : "Noticia no habilitada"
                    }
                    name="enable"
                    onChange={(e) => {
                      e.persist();
                      this.props.updateEnable(e.target.checked);
                      
                    }}
                  ></MDBInput>
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
                        this.props.handleSaveNews();
                      }}
                      disabled={
                          !this.props.news_modal.title||this.props.news_modal.title===""||
                          !this.props.news_modal.content||this.props.news_modal.content===""
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

export default NewsModal;