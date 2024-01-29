import React from 'react';
import {
    MDBDataTable,
    MDBIcon,
} from "mdbreact";
import { Link } from "react-router-dom";
import * as ROUTES from "../../bloc/constants/const_routes";

class TableCarsRequests extends React.Component{

    render(){
        var data = {
                columns: [
                {
                    label: "Marca",
                    field: "brand",
                    width: 150,
                },
                {
                    label: "Modelo",
                    field: "model",
                    width: 150,
                },
                {
                    label: "Placa",
                    field: "plate",
                    width: 140,
                },
                {
                    label: "Año",
                    field: "year",
                    width: 140,
                },
                {
                    label: "Acción",
                    field: "action",
                    sort: "disabled",
                    width: 100,
                },
                ],
                rows: this.props.carsRequest.map((car) => {
                    return {
                        brand: car.information.brand,
                        model: car.information.model,
                        plate: car.information.plate,
                        year: car.information.year,
                        action: (
                            <Link to = {`${ROUTES.CAR_REQUEST}/${car.car_id}`}>
                                <MDBIcon
                                    icon="eye blue-text"
                                    size={"2x"}
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

export default TableCarsRequests;