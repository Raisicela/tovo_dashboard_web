import React from "react";
import {
  MDBSideNavLink,
  MDBSideNavCat,
  MDBSideNavNav,
  MDBSideNav,
  MDBIcon,
  MDBRow,
} from "mdbreact";
import * as ROUTES from "../../bloc/constants/const_routes";

class SideNavigation extends React.Component {
  rSNL(to, text) {
    return (
      <MDBSideNavLink to={to} onClick={this.props.onLinkClick}>
        {text}
      </MDBSideNavLink>
    );
  }

  render() {
    const { onLinkClick } = this.props;
    return (
      <div>
        <MDBSideNav
          mask="strong"
          breakWidth={this.props.breakWidth}
          triggerOpening={this.props.triggerOpening}
          style={{
            transition: "padding-left .5s",
            backgroundColor: "rgb(43, 50, 81)",
          }}
        >
          <MDBRow center style={{ backgroundColor: "rgb(43, 50, 81)" }}>
            <img
              className="side_bar_logo"
              alt="Logotipo de tovo"
              src="/logo.png"
            />
          </MDBRow>

          <MDBSideNavNav>
            <MDBSideNavCat name="Usuarios" icon="users" id="usuarios">
              <MDBSideNavLink
                to={ROUTES.USER_REQUEST}
                topLevel
                onClick={onLinkClick}
              >
                <MDBIcon icon="address-book" className="mr-2" />
                Solicitudes de verificación
              </MDBSideNavLink>
              <MDBSideNavLink
                to={ROUTES.PASSENGER_APPROVED}
                topLevel
                onClick={onLinkClick}
              >
                <MDBIcon icon="users" className="mr-2" />
                Pasajeros aprobados
              </MDBSideNavLink>
              <MDBSideNavLink
                to={ROUTES.DRIVER_APPROVED}
                topLevel
                onClick={onLinkClick}
              >
                <MDBIcon icon="users" className="mr-2" />
                Choferes aprobados
              </MDBSideNavLink>
              <MDBSideNavLink
                to={ROUTES.USER_REWARDS}
                topLevel
                onClick={onLinkClick}
              >
                <MDBIcon icon="gift" className="mr-2" />
                Recompensas
              </MDBSideNavLink>
            </MDBSideNavCat>
            <MDBSideNavCat name="Vehículos" icon="car" id="vehiculos">
              <MDBSideNavLink
                to={ROUTES.CAR_REQUEST}
                topLevel
                onClick={onLinkClick}
              >
                <MDBIcon icon="address-book" className="mr-2" />
                Solicitudes
              </MDBSideNavLink>
              <MDBSideNavLink
                to={ROUTES.CAR_APPROVED}
                topLevel
                onClick={onLinkClick}
              >
                <MDBIcon icon="car" className="mr-2" />
                Aprobados
              </MDBSideNavLink>
            </MDBSideNavCat>

            {/* Groups */}
            <MDBSideNavLink to={ROUTES.GROUPS} topLevel onClick={onLinkClick}>
              <MDBIcon icon="people-carry" className="mr-2" />
              Grupos
            </MDBSideNavLink>
            {/* END Groups */}

            {/* <MDBSideNavLink
              to={ROUTES.RESERVATIONS}
              topLevel
              onClick={onLinkClick}
            >
              <MDBIcon icon="book" className="mr-2" />
              Reservas
            </MDBSideNavLink> */}

            <MDBSideNavLink to={ROUTES.TRIPS} topLevel onClick={onLinkClick}>
              <MDBIcon icon="shipping-fast" className="mr-2" />
              Viajes finalizados
            </MDBSideNavLink>

            {/*  <MDBSideNavLink to={ROUTES.PROFILE} topLevel onClick={onLinkClick}>
              <MDBIcon icon="chalkboard-teacher" className="mr-2" />
              Perfil
            </MDBSideNavLink> */}

            <MDBSideNavLink to={ROUTES.SETTINGS} topLevel onClick={onLinkClick}>
              <MDBIcon icon="coins" className="mr-2" />
              Configuraciones
            </MDBSideNavLink>

            <MDBSideNavLink to={ROUTES.INTROS} topLevel onClick={onLinkClick}>
              <MDBIcon icon="mobile-alt" className="mr-2" />
              Imagenes App
            </MDBSideNavLink>
            <MDBSideNavLink
              to={ROUTES.MILESTONES}
              topLevel
              onClick={onLinkClick}
            >
              <MDBIcon icon="archway" className="mr-2" />
              Hitos
            </MDBSideNavLink>

            <MDBSideNavLink to={ROUTES.NEWS} topLevel onClick={onLinkClick}>
              <MDBIcon icon="coins" className="mr-2" />
              Noticias App
            </MDBSideNavLink>
            <MDBSideNavLink
              to={ROUTES.TRANSACTIONS}
              topLevel
              onClick={onLinkClick}
            >
              <MDBIcon icon="dollar-sign" className="mr-2" />
              Recargas Bancarias
            </MDBSideNavLink>
          </MDBSideNavNav>
        </MDBSideNav>
      </div>
    );
  }
}

export default SideNavigation;
