import React from 'react';
import {
    MDBDataTable,
    MDBIcon,
} from "mdbreact";
import { Link } from "react-router-dom";
import * as ROUTES from "../../bloc/constants/const_routes";

class TableUserRequests extends React.Component{

    render(){
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
                    width: 350,
                },
                {
                    label: "Ciudad",
                    field: "city",
                    width: 120,
                },
                {
                    label: "Provincia",
                    field: "province",
                    width: 120,
                },
                {
                    label: "Información personal",
                    field: "passengerState",
                    width: 150,
                },
                {
                    label: "Información conductor",
                    field: "driverState",
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
                        name: appUser.personalInformation.data.name + " " + appUser.personalInformation.data.lastName,
                        email: appUser.personalInformation.data.email,
                        city: appUser.personalInformation.data.city,
                        province: appUser.personalInformation.data.province,
                        passengerState: 
                            ((appUser.personalInformation.data.status===2 || appUser.personalInformation.identification.status ===2) && (appUser.personalInformation.data.status!==1 || appUser.personalInformation.identification.status !==1) ) ?"Por verificar":
                            appUser.personalInformation.status.verified?"Verificado":"No verificado",
                        driverState: 
                            ((appUser.driverInformation.licence.status===2 || appUser.driverInformation.bank.isComplete)&& (appUser.driverInformation.licence.status!==1 || !appUser.driverInformation.bank.isComplete))?"Por verificar":
                            appUser.driverInformation.status.verified?"Verificado":"No verificado",
                        action: (
                            <Link to = {`${ROUTES.USER_REQUEST}/${appUser.userId}`}>
                                <MDBIcon
                                    icon="eye blue-text"
                                    size={"2x"}
                                    onClick={() => {
                                        
                                    }}
                                />
                            </Link>
                            
                        )
                    }
                }),
            };

        return(
            <MDBDataTable scrollX striped bordered data={data} exportToCSV = {true} />
        );
    }

}

export default TableUserRequests;