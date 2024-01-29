import React from "react";
import { MDBDataTable, MDBIcon } from "mdbreact";
import { Link } from "react-router-dom";
import * as ROUTES from "../../bloc/constants/const_routes";
class TablePassengersAproved extends React.Component {
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
          label: "Email",
          field: "email",
          width: 300,
        },
        {
          label: "Ciudad",
          field: "city",
          width: 140,
        },
        {
          label: "Provincia",
          field: "province",
          width: 140,
        },
        {
          label: "Edad",
          field: "age",
          width: 150,
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
          label: "Distancia recorrida [Km]",
          field: "distanceAllTrips",
          width: 150,
        },
        {
          label: "Acción",
          field: "action",
          sort: "disabled",
          width: 80,
        },
      ],
      rows: this.props.usersRequest.map((appUser) => {
        return {
          name:
            appUser.personalInformation.data.name +
            " " +
            appUser.personalInformation.data.lastName,
          email: appUser.personalInformation.data.email,
          city: appUser.personalInformation.data.city,
          province: appUser.personalInformation.data.province,
          age: appUser.personalInformation.data.birthDay
            ? this._calculateAge(
                appUser.personalInformation.data.birthDay.toDate()
              )
            : "",
          phone: appUser.personalInformation.phone.internationalNumber,
          gender:
            appUser.personalInformation.data.gender === 0 ? "Hombre" : "Mujer",
          distanceAllTrips: appUser.personalInformation.trips.distance
            ? appUser.personalInformation.trips.distance.toFixed(1)
            : "",
          action: (
            <Link to={`${ROUTES.PROFILE}/${appUser.userId}/passenger`}>
              <MDBIcon icon="eye blue-text" size={"2x"} onClick={() => {}} />
            </Link>
          ),
        };
      }),
    };

    return (
      <MDBDataTable scrollX striped bordered data={data} exportToCSV={true} />
    );
  }
}

export default TablePassengersAproved;
