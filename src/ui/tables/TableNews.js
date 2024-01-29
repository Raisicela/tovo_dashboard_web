import React from 'react';
import {
    MDBDataTable,
    MDBIcon,
} from "mdbreact";

var moment = require("moment");

class NewsTable extends React.Component{

    render(){
        var data = {
            columns:[
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
                    width: 100,
                },
                {
                    label: "Contenido",
                    field: "content",
                    // sort: "disabled",
                    width: 300,
                },
                {
                    label: "Fecha",
                    field: "date",
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
                    width: 100,
                },
            ],
            rows: this.props.newsList.map((news, index)=>{
                console.log(news)
                return {
                    foto: (
                        <img 
                        src={news.photoUrl}
                        alt={news.name}
                        width = "50"
                        />
                    ),
                    title: news.title,
                    content: news.content,
                    date: moment(news.date.toDate()).format(
                        "DD/MM/YYYY hh:mm"
                      ),
                    enable: news.enable?"si":"no",
                    edit: (
                        <MDBIcon
                                icon="edit blue-text"
                                size={"2x"}
                                onClick={() => {
                                    this.props.openNewModal(news);
                                }}
                            />
                    )

                }
            })
        };
        return(
            <MDBDataTable scrollX striped bordered hover data={data} />
        );
    }
}

export default NewsTable;