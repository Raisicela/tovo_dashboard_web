import React from "react";
import { MDBDataTable, MDBIcon } from "mdbreact";
import * as BR from "../../bloc/constants/business_rules";

class MilestonesTable extends React.Component {
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
          label: "Descripción",
          field: "description",
          // sort: "disabled",
          width: 300,
        },
        {
          label: "Tipo",
          field: "type",
          // sort: "disabled",
          width: 100,
        },
        {
          label: "Cantidad",
          field: "quantity",
          width: 100,
        },
        {
          label: "Puntos",
          field: "points",
          width: 100,
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
          width: 80,
        },
      ],
      rows: this.props.milestonesList.map((milestone, index) => {
        return {
          foto: (
            <img src={milestone.photoUrl} alt={milestone.name} width="50" />
          ),
          title: milestone.title,
          type: BR.MILESTONES_TYPES[milestone.type - 1],
          description: milestone.description,
          quantity: milestone.quantity,
          points: milestone.points,
          order: milestone.order,
          enable: milestone.enable ? "si" : "no",
          edit: (
            <MDBIcon
              icon="edit blue-text"
              size={"2x"}
              onClick={() => {
                this.props.openMilestoneModal(milestone);
              }}
            />
          ),
        };
      }),
    };
    return <MDBDataTable scrollX striped bordered hover data={data} />;
  }
}

export default MilestonesTable;
