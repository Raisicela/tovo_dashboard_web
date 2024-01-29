import React from 'react';
import {
    MDBBtn,
    MDBDataTable,
} from "mdbreact";

class TableApprovedReservations extends React.Component{

    render(){
        var data = {
                columns: [
                {
                    label: "Usuario",
                    field: "user",
                    width: 120,
                },
                {
                    label: "Tipo",
                    field: "type",
                    width: 100,
                },
                {
                    label: "Precio unitario",
                    field: "unitPrice",
                    width: 120,
                },
                {
                    label: "Cantidad",
                    field: "quantity",
                    width: 100,
                },

                {
                    label: "Precio total",
                    field: "totalPrice",
                    width: 100,
                },
                {
                    label: "Link de pago",
                    field: "link",
                    width: 350,
                },
                {
                    label: "Accion",
                    field: "action",
                    width: 150,
                },
                ],
                rows: this.props.reservationsData.map((reservation) => {
                    return {
                        user: reservation.appUser.personalInformation.data.name + " " + reservation.appUser.personalInformation.data.lastName +"\n"+
                            reservation.appUser.personalInformation.phone.internationalNumber,
                        type: reservation.type===1? "Pasajero": "Encomienda",
                        unitPrice: reservation.information.unitPrice,
                        quantity: reservation.information.quantity,
                        totalPrice: reservation.information.totalPrice,
                        link: reservation.cardId,
                        action: 
                            <MDBBtn
                                color = "blue"
                                onClick={() => {
                                    this.props.openReservationLinkModal(reservation);
                                }}>
                                    Enlace de pago
                            </MDBBtn>,
                    }
                }),
            };

        return(
            <MDBDataTable scrollX striped bordered data={data} exportToCSV = {true} />
        );
    }

}

export default TableApprovedReservations;