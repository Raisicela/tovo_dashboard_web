import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBIcon,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdbreact";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../../bloc/Firebase";
import * as ROUTES from "../../bloc/constants/const_routes";
import Notifications from "./Notifications";

class TopNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      notificationsShow: false,
      notificationsData: [],
    };
    this.onClick = this.onClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleToggleClickA = this.handleToggleClickA.bind(this);
    this.clickNotifications = this.clickNotifications.bind(this);
    this.clickOutsideNotifications = this.clickOutsideNotifications.bind(this);
    this.clickOnReview = this.clickOnReview.bind(this);
    this.clickOnIgnore = this.clickOnIgnore.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  handleToggleClickA() {
    this.props.onSideNavToggleClick();
  }

  clickNotifications() {
    this.setState({
      notificationsShow: true,
    });
  }

  clickOutsideNotifications() {
    setTimeout(() => {
      this.setState({
        notificationsShow: false,
      });
    }, 1);
  }

  getUncheckedNotifications() {
    const unchecked = this.state.notificationsData.filter(
      (x) => x.checked === false
    );
    return unchecked.length;
  }

  clickOnReview(dashboardNotificationId, entityId, type) {
    this.props.firebase.reviewNotification(dashboardNotificationId);
    this.setState({
      notificationsShow: false,
    });
    // Redirect
    let pathName = "error";
    switch (type) {
      case "userVerification":
        console.log("PATH:", `${ROUTES.USER_REQUEST}/${entityId}`);
        this.props.history.push(`${ROUTES.USER_REQUEST}/${entityId}`);
        break;
      case "car":
        console.log("PATH:", `${ROUTES.CAR_REQUEST}/${entityId}`);
        this.props.history.push(`${ROUTES.CAR_REQUEST}/${entityId}`);
        break;
      default:
        break;
    }
    if (pathName !== "error") {
      setTimeout(() => {
        this.props.history.push(pathName);
      }, 1);
    } else {
      console.log(
        "Error: type:",
        type,
        typeof type,
        "pathName:",
        pathName,
        typeof pathName
      );
    }
  }

  clickOnIgnore(dashboardNotificationId) {
    this.props.firebase.ignoreNotification(dashboardNotificationId);
  }

  componentDidMount() {
    this.props.firebase
      .getDashboardNotifications()
      .onSnapshot(async (querySnapshot) => {
        const getData = async () => {
          return Promise.all(
            querySnapshot.docs.map(async function (notificationsDocument) {
              var notification = notificationsDocument.data();
              return Promise.resolve(notification);
            })
          );
        };
        getData()
          .then((data) => {
            this.setState({
              notificationsData: data,
            });
          })
          .catch((error) => {
            console.log(error.message);
          });
      });

    // Ruta: user/request -> Verificar usuarios
    // Ruta: car/request -> Verificar carros
  }

  render() {
    return (
      <Router>
        <MDBNavbar
          className="flexible-MDBNavbar"
          light
          expand="md"
          scrolling
          fixed="top"
          style={{ zIndex: 3 }}
        >
          <div className="d-flex justify-content-between align-items-center w-100">
            {/* Hambuguer menu */}
            <div
              onClick={this.handleToggleClickA}
              key="sideNavToggleA"
              style={{
                lineHeight: "32px",
                marginleft: "1em",
                verticalAlign: "middle",
                cursor: "pointer",
              }}
            >
              <MDBIcon icon="bars" color="white" size="lg" />
            </div>
            {/* END Hambuguer menu */}

            <div className="d-flex justify-content-end align-items-center position-relative">
              {/* Dashboard notifications */}
              <div
                className="d-flex justify-content-end align-items-center pointer"
                onClick={this.clickNotifications}
              >
                {/* <span className="mr-2">Notificaciones</span> */}
                <i className="fas fa-bell" style={{ color: "gray" }}>
                  <span
                    className="mr-2"
                    style={{
                      color:
                        this.getUncheckedNotifications() === 0 ? "gray" : "red",
                      paddingLeft: "2px",
                    }}
                  >
                    {this.getUncheckedNotifications()}
                  </span>
                </i>
              </div>
              <style>
                {`.pointer:hover{cursor: pointer}
                .pointer i:hover{color: #252525 !important}`}
              </style>

              {this.state.notificationsShow && (
                <Notifications
                  closeNotifications={this.clickOutsideNotifications}
                  data={this.state.notificationsData}
                  clickOnReview={this.clickOnReview}
                  clickOnIgnore={this.clickOnIgnore}
                />
              )}
              {/* END Dashboard notifications */}

              <MDBNavbarNav expand="sm" right style={{ flexDirection: "row" }}>
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <MDBIcon icon="user" />{" "}
                    <span className="d-none d-md-inline">
                      {this.props.firebase.currentUser() == null
                        ? ""
                        : this.props.firebase.currentUser().displayName}
                    </span>
                  </MDBDropdownToggle>

                  <MDBDropdownMenu right style={{ minWidth: "200px" }}>
                    <MDBDropdownItem
                      onClick={() => {
                        this.props.firebase.doSignOut();
                        this.props.history.push(ROUTES.SIGN_IN);
                      }}
                    >
                      Cerrar sesión
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarNav>
            </div>
          </div>
        </MDBNavbar>
      </Router>
    );
  }
}

export default compose(withRouter, withFirebase)(TopNavigation);
