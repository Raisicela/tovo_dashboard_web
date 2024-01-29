import React from 'react';
import {
    MDBDataTable,
    MDBIcon,
} from "mdbreact";
//import Transactions from '../pages/Transactions';

var moment = require("moment");

class TransactionsTable extends React.Component{

    render(){
        var data = {
            columns:[
                {
                    label: "FOTO",
                    field: "foto",
                    sort: "disabled",
                    width: 100,
                },
                // {
                //     label: "Realizado por",
                //     field: "userId",
                //     // sort: "disabled",
                //     width: 250,
                // },
                {
                    label: "Fecha",
                    field: "date",
                    // sort: "disabled",
                    width: 100,
                },
                {
                    label: "Estado",
                    field: "status",
                    sort: "disabled",
                    width: 100,
                },
                {
                    label: "Valor",
                    field: "value",
                    sort: "disabled",
                    width: 100,
                },
                
            ],
            rows: this.props.transactionsList.map((transactions, index)=>{
                return {
                    foto: (
                        <img 
                        src={transactions.photoUrl}
                        alt={transactions.name}
                        width = "50px"
                        /> 
                    ),
                    //userId: transactions.userId,
                    date: moment(transactions.createdAt.toDate()).format(
                        "DD/MM/YYYY hh:mm"
                      ),
                    status: transactions.status===1?"pendiente":transactions.status===2?"rechazada":transactions.status===3?"aprobada":"",
                    value: transactions.value/100,
                    edit: (
                        <MDBIcon
                                icon="edit blue-text"
                                size={"2x"}
                                onClick={() => {

                                    this.props.openTransactionsModal(transactions);
                                }}
                            />
                    )

                }
            })
        };
        if(this.props.selectedMethod === "bankTransfer"){
            data.columns.push({
                label: "Editar",
                field: "edit",
                sort: "disabled",
                width: 100,
            });
        }
        if(this.props.selectedMethod === "payphoneApi"){
            //eliminar el primer elemento
            data.columns.splice(0,1);
        }
        return(
            <MDBDataTable scrollX striped bordered hover data={data} />
        );
    }
}

export default TransactionsTable;