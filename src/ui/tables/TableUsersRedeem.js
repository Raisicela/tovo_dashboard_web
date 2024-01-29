import React from "react";
import { MDBDataTable } from "mdbreact";
import * as BR from "../../bloc/constants/business_rules";
import moment from "moment";

class TableUsersRedeemReward extends React.Component {
  _calculateAge(birthday) {
    // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  render() {
    var data = {
      columns: [
        {
          label: "Nombre",
          field: "name",
          width: 150,
        },
        {
          label: "Ciudad",
          field: "city",
          width: 140,
        },
        {
          label: "Celular",
          field: "phone",
          width: 150,
        },
        {
          label: "Género",
          field: "gender",
          width: 150,
        },
        {
          label: "Titulo",
          field: "title",
          width: 150,
        },
        {
          label: "Descripción",
          field: "description",
          width: 150,
        },
        {
          label: "Tipo",
          field: "type",
          width: 150,
        },
        {
          label: "Fecha",
          field: "date",
          width: 150,
        },
        {
          label: "Estatus",
          field: "status",
          width: 150,
        },
      ],
      rows: this.props.redeemRewardsList.map((redeemReward) => {
        return {
          name:
            redeemReward.appUser.personalInformation.data.name +
            " " +
            redeemReward.appUser.personalInformation.data.lastName,
          email: redeemReward.appUser.personalInformation.data.email,
          city:
            redeemReward.appUser.personalInformation.data.city +
            " - " +
            redeemReward.appUser.personalInformation.data.province,
          phone:
            redeemReward.appUser.personalInformation.phone.internationalNumber,
          gender:
            redeemReward.appUser.personalInformation.data.gender === 0
              ? "Hombre"
              : "Mujer",
          title: redeemReward.reward.title,
          description: redeemReward.reward.description,
          type: BR.REWARDS_TYPES[redeemReward.reward.type - 1],
          date: moment(redeemReward.date.toDate()).format("DD/MM/YYYY hh:mm"),
          status:
            redeemReward.status === 1
              ? "Pendiente"
              : redeemReward.status === 2
              ? "Aprobado"
              : redeemReward.status === 3
              ? "Rechazado"
              : "",
        };
      }),
    };

    return (
      <MDBDataTable scrollX striped bordered data={data} exportToCSV={true} />
    );
  }
}

export default TableUsersRedeemReward;
