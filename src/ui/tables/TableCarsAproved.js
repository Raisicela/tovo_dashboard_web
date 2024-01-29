import React from 'react';
import {
    MDBDataTable,
} from "mdbreact";

import DynamicContainer from "../components/DinamicContainer";

class TableCarsAproved extends React.Component{

    intToRGB = (value) => {
        var blue = Math.floor(value % 256);
        var green = Math.floor(value / 256 % 256);
        var red = Math.floor(value / 256 / 256 % 256);
        return "rgb(" + red + "," + green + "," + blue + ")";
      }

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
                    label: "Color",
                    field: "color",
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
                        color: (
                            <DynamicContainer bgColor={this.intToRGB(car.information.color)} >
                            </DynamicContainer>
                        )
                    }
                }),
            };

        return(
            <MDBDataTable scrollX striped bordered data={data} exportToCSV = {true} />
        );
    }

}

export default TableCarsAproved;