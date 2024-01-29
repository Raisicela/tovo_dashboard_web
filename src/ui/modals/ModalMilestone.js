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
import * as BR from "../../bloc/constants/business_rules";

class MilestoneModal extends React.Component {
  // constructor(props){
  //     super(props);
  // }

  componentDidMount() {}

  render() {
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
            photoUrl={this.props.milestone_modal.photoUrlLocal}
            inputHandler={this.props.fileInputHandler}
          ></Dropzone>
        </MDBModalHeader>

        <MDBModalBody>
          <section>
            <MDBRow>
              <MDBCol md="12" lg="12">
                <MDBInput
                  value={this.props.milestone_modal.title}
                  name="title"
                  onChange={this.props.handleChange}
                  type="textarea"
                  id="title"
                  label="Titulo del hito"
                  required
                ></MDBInput>
                <MDBInput
                  value={this.props.milestone_modal.description}
                  name="description"
                  onChange={this.props.handleChange}
                  type="textarea"
                  id="description"
                  label="Descripción del hito"
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
                    {BR.MILESTONES_TYPES.map((type, index) => {
                      return (
                        <MDBSelectOption
                          key={index + 1}
                          value={index + 1}
                          checked={
                            this.props.milestone_modal.type === index + 1
                          }
                        >
                          {type}
                        </MDBSelectOption>
                      );
                    })}
                  </MDBSelectOptions>
                </MDBSelect>

                <MDBInput
                  // icon="address-card"
                  value={this.props.milestone_modal.quantity}
                  name="quantity"
                  onChange={this.props.handleChange}
                  type="number"
                  id="quantity"
                  label="Cantidad"
                  required
                ></MDBInput>

                <MDBInput
                  // icon="address-card"
                  value={this.props.milestone_modal.points}
                  name="points"
                  onChange={this.props.handleChange}
                  type="number"
                  id="points"
                  label="Puntos"
                  required
                ></MDBInput>

                <MDBInput
                  // icon="address-card"
                  value={this.props.milestone_modal.order}
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
                checked={this.props.milestone_modal.enable}
                type="checkbox"
                id="check enable"
                label={
                  this.props.milestone_modal.enable
                    ? "Hito habilitada"
                    : "Hito no habilitada"
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
                    this.props.handleSaveMilestone();
                  }}
                  disabled={
                    !this.props.milestone_modal.title ||
                    this.props.milestone_modal.title === "" ||
                    !this.props.milestone_modal.description ||
                    this.props.milestone_modal.description === "" ||
                    !this.props.milestone_modal.order ||
                    this.props.milestone_modal.order === ""
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

export default MilestoneModal;
