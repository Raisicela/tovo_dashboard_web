import React from "react";
import { MDBDataTable } from "mdbreact";
var moment = require("moment");

class TableFinishedTrips extends React.Component {
  render() {
    var data = {
      columns: [
        {
          label: "Conductor",
          field: "driver",
          width: 200,
        },
        {
          label: "Lugar de inicio",
          field: "startAddress",
          width: 200,
        },
        {
          label: "Lugar de fin",
          field: "finishAddress",
          width: 200,
        },

        {
          label: "Fecha",
          field: "date",
          width: 100,
        },
        {
          label: "Vehículo",
          field: "car",
          width: 140,
        },
        {
          label: "Reservas",
          field: "reservations",
          width: 140,
        },
        {
          label: "Ingreso Total",
          field: "total",
          width: 140,
        },
        {
          label: "Ingreso conductor",
          field: "totalDriver",
          width: 140,
        },
        {
          label: "Ingreso Tovo",
          field: "totalTovo",
          width: 140,
        },

        /*  {
          label: "Acciones",
          field: "voucher",
          width: 100,
        }, */
      ],
      rows: this.props.tripsData.map((trip) => {
        let totalTrip = 0;
        let totalDriver = 0;
        let totalTovo = 0;
        trip.carpoolReservationsList.forEach((carpoolReservation) => {
          totalTrip += carpoolReservation.information.totalPrice;
          totalDriver += carpoolReservation.information.driverPrice;
          totalTovo += carpoolReservation.information.appPrice;
        });

        return {
          driver:
            trip.driver.personalInformation.data.name +
            " " +
            trip.driver.personalInformation.data.lastName +
            "\n" +
            trip.driver.personalInformation.phone.internationalNumber,
          startAddress:
            trip.driverRoute.sourceAddress.province +
            " - " +
            trip.driverRoute.sourceAddress.city +
            "\n" +
            trip.driverRoute.sourceAddress.name,
          finishAddress:
            trip.driverRoute.destinationAddress.province +
            " - " +
            trip.driverRoute.destinationAddress.city +
            "\n" +
            trip.driverRoute.destinationAddress.name,
          car:
            trip.driverRoute.detailsCar.brand +
            " - " +
            trip.driverRoute.detailsCar.model +
            "\n" +
            trip.driverRoute.detailsCar.year,
          date: moment(trip.createdAt.toDate()).format("DD/MM/YYYY HH:mm"),
          reservations: trip.carpoolReservationsList.length,
          total: totalTrip,
          totalDriver: totalDriver,
          totalTovo: totalTovo,
          /* voucher: (
            <Link to={`${ROUTES.TRIPS}/${trip.tripId}`}>
              <MDBIcon icon="eye blue-text" size={"2x"} />
            </Link>
          ), */
        };
      }),
    };

    return (
      <MDBDataTable scrollX striped bordered data={data} exportToCSV={true} />
    );
  }
}

export default TableFinishedTrips;
