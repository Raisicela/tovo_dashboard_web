import React from "react";
import { MDBDataTable, MDBIcon } from "mdbreact";

class IntrosTable extends React.Component {
  render() {
    var data = {
      columns: [
        {
          label: "FOTO",
          field: "foto",
          sort: "disabled",
          width: 100,
        },
        {
          label: "Titulo",
          field: "title",
          // sort: "disabled",
          width: 200,
        },
        {
          label: "Tipo",
          field: "type",
          // sort: "disabled",
          width: 100,
        },
        {
          label: "Descripción",
          field: "description",
          // sort: "disabled",
          width: 300,
        },
        {
          label: "Orden",
          field: "order",
          // sort: "disabled",
          width: 100,
        },
        {
          label: "Habilitado",
          field: "enable",
          sort: "disabled",
          width: 100,
        },
        {
          label: "Editar",
          field: "edit",
          sort: "disabled",
          width: 50,
        },
      ],
      rows: this.props.introsList.map((intro, index) => {
        return {
          foto: <img src={intro.photoUrl} alt={intro.name} width="50" />,
          title: intro.title,
          type:
            intro.type === 1
              ? "Intro"
              : intro.type === 2
              ? "Carrusel"
              : intro.type === 3
              ? "Menu principal"
              : intro.type === 4
              ? "Cuenta Bancaria"
              : "",
          description: intro.description,
          order: intro.order,
          enable: intro.enable ? "si" : "no",
          edit: (
            <MDBIcon
              icon="edit blue-text"
              size={"2x"}
              onClick={() => {
                this.props.openIntroModal(intro);
              }}
            />
          ),
        };
      }),
    };
    return <MDBDataTable scrollX striped bordered hover data={data} />;
  }
}

export default IntrosTable;
