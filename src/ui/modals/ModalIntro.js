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
  MDBSelect,
  MDBSelectInput,
  MDBSelectOption,
  MDBSelectOptions,
} from "mdbreact";
import Dropzone from "../components/ChooseImage";

class IntroModal extends React.Component {
  // constructor(props){
  //     super(props);
  // }

  componentDidMount() {
    console.log("IntroModal,", this.props.intro_modal);
  }

  render() {
    const types = ["Intro", "Carrusel", "Menu principal", "Cuenta Bancaria"];
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
        wrapClassName="w-100"
      >
        <MDBModalHeader className="mx-auto">
          <Dropzone
            photoUrl={this.props.intro_modal.photoUrlLocal}
            inputHandler={this.props.fileInputHandler}
          ></Dropzone>
        </MDBModalHeader>

        <MDBModalBody>
          <section>
            <MDBRow>
              <MDBCol md="12" lg="12">
                <MDBInput
                  value={this.props.intro_modal.title}
                  name="title"
                  onChange={this.props.handleChange}
                  type="textarea"
                  id="title"
                  label="Titulo"
                  required
                ></MDBInput>
                <MDBSelect
                  label="Tipo"
                  getValue={(value) => {
                    console.log(value);
                    if (!value) {
                      return;
                    }
                    this.props.handleChangeType(value);
                  }}
                >
                  <MDBSelectInput selected="Escoja una opción" />
                  <MDBSelectOptions>
                    {/* <MDBSelectOption disabled>
                      Escoja una opción
                    </MDBSelectOption> */}
                    {types.map((type, index) => {
                      return (
                        <MDBSelectOption
                          key={index + 1}
                          value={index + 1}
                          checked={this.props.intro_modal.type === index + 1}
                        >
                          {type}
                        </MDBSelectOption>
                      );
                    })}
                  </MDBSelectOptions>
                </MDBSelect>
                {/* <MDBInput
                      value={this.props.intro_modal.type}
                      name="type"
                      onChange={this.props.handleChange}
                      type="text"
                      id="type"
                      label="Tipo"
                      required
                    >
                    </MDBInput> */}
                <MDBInput
                  value={this.props.intro_modal.description}
                  name="description"
                  onChange={this.props.handleChange}
                  type="textarea"
                  id="description"
                  label="Descripción"
                  required
                ></MDBInput>
                <MDBInput
                  // icon="address-card"
                  value={this.props.intro_modal.order}
                  name="order"
                  onChange={this.props.handleChange}
                  type="number"
                  id="order"
                  label="Orden"
                  required
                ></MDBInput>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBInput
                checked={this.props.intro_modal.enable}
                type="checkbox"
                id="check enable"
                label={
                  this.props.intro_modal.enable
                    ? "Intro habilitada"
                    : "Intro no habilitada"
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
                    this.props.handleSaveIntro();
                  }}
                  disabled={
                    !this.props.intro_modal.title ||
                    this.props.intro_modal.title === "" ||
                    !this.props.intro_modal.description ||
                    this.props.intro_modal.description === "" ||
                    !this.props.intro_modal.order ||
                    this.props.intro_modal.order === ""
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
  }
}

export default IntroModal;
