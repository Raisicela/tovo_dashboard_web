import React from "react";
import { MDBDataTable } from "mdbreact";
// import { MDBDataTable, MDBIcon } from "mdbreact";
// import { Link } from "react-router-dom";
// import * as ROUTES from "../../bloc/constants/const_routes";
import moment from "moment";

class TableGroups extends React.Component {
  render() {
    var data = {
      columns: [
        {
          label: "Nombre",
          field: "name",
          width: 150,
        },
        {
          label: "Descripción",
          field: "description",
          width: 350,
        },
        {
          label: "Foto",
          field: "photo",
          width: 120,
        },
        {
          label: "Público",
          field: "public",
          width: 120,
        },
        // {
        //   label: "Activo",
        //   field: "active",
        //   width: 150,
        // },
        {
          label: "Fecha de creación",
          field: "createdAt",
          width: 200,
        },
        {
          label: "Miembros",
          field: "noMembers",
          width: 200,
        },
        {
          label: "Acciones",
          field: "action",
          width: 200,
        },
      ],
      rows: this.props.groupsData.map((group) => {
        console.log("group:", group.members);
        return {
          name: group.groupName,
          description: group.groupDescription,
          photo: (
            <img src={group.groupPhotoUrl} width={80} alt={group.groupName} />
          ),
          public: group.isPublic ? "Público" : "Privado",
          createdAt: moment(group.createdAt.toDate()).format("YYYY-MM-DD"),
          noMembers: group.members.map((member) => {
            return (
              <p>
                {member.personalInformation.data.name}{" "}
                {member.personalInformation.data.lastName}
              </p>
            );
          }),
          action: (
            <div className="container">
              <div className="row">
                <div className="col-12 text-center">
                  <button
                    className={`btn px-3 ${
                      group.isActive ? "btn-success" : "btn-warning"
                    }`}
                    title={
                      group.isActive
                        ? "Click para desactivar"
                        : "Click para activar"
                    }
                  >
                    {group.isActive ? "Activado" : "Desactivado"}
                  </button>
                </div>

                <div className="col-12 text-center">
                  <button
                    className={`btn px-3 ${
                      group.isVerified ? "btn-success" : "btn-warning"
                    }`}
                    disabled={group.isVerified ? true : false}
                  >
                    {group.isVerified ? "Verificado" : "Verificar"}
                  </button>
                </div>
              </div>
            </div>
          ),
        };
      }),
    };

    return (
      <MDBDataTable scrollX striped bordered data={data} exportToCSV={true} />
    );
  }
}

export default TableGroups;
