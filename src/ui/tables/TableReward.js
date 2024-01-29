import React from "react";
import { MDBDataTable, MDBIcon } from "mdbreact";
import * as BR from "../../bloc/constants/business_rules";

class RewardsTable extends React.Component {
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
      rows: this.props.rewardsList.map((reward, index) => {
        return {
          foto: <img src={reward.photoUrl} alt={reward.name} width="50" />,
          title: reward.title,
          type: BR.REWARDS_TYPES[reward.type - 1],
          description: reward.description,
          quantity: reward.quantity,
          points: reward.points,
          order: reward.order,
          enable: reward.enable ? "si" : "no",
          edit: (
            <MDBIcon
              icon="edit blue-text"
              size={"2x"}
              onClick={() => {
                this.props.openRewardModal(reward);
              }}
            />
          ),
        };
      }),
    };
    return <MDBDataTable scrollX striped bordered hover data={data} />;
  }
}

export default RewardsTable;
