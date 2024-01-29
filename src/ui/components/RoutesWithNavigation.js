import React, { Component } from "react";
import SideNavigation from "./SideNavigation";
import TopNavigation from "./TopNavigation";
import Copyrights from "./Footer";
import Routes from "./Routes";
import "../../App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      windowWidth: 0,
      currentPage: "",
      sideNavToggled: false,
      breakWidth: 2400,     //1400 antes
    };
  }

  componentDidUpdate(prevProps, nextProps, snapshot) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      // this.assessLocation(this.props.location.pathname);
    }
  }
  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
    // this.assessLocation(this.props.location.pathname);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    this.setState({
      windowWidth: window.innerWidth,
    });
  };

  toggleSideNav = () => {
    if (this.state.windowWidth < this.state.breakWidth) {
      this.setState({
        sideNavToggled: !this.state.sideNavToggled,
      });
    }
  };

  render() {
    const dynamicLeftPadding = {
      paddingLeft:
        this.state.windowWidth > this.state.breakWidth ? "240px" : "0",
    };

    return (
      <div className="app">
        <div className="white-skin">
          <SideNavigation
            breakWidth={this.state.breakWidth}
            style={{ transition: "all .3s" }}
            triggerOpening={this.state.sideNavToggled}
            onLinkClick={() => this.toggleSideNav()}
          />
        </div>
        <div className="flexible-content white-skin">
          <TopNavigation
            toggle={this.state.windowWidth < this.state.breakWidth}
            onSideNavToggleClick={this.toggleSideNav}
            /*  routeName={this.state.currentPage} */
            className="white-skin"
          />
          <main style={{ ...dynamicLeftPadding, margin: "8rem 6% 6rem" }}>
            <Routes />
          </main>
          <Copyrights
            style={{ ...dynamicLeftPadding,
              // position: "bottom",
               position: "fixed", 
               width: "100%" 
              }}
            className="d-none d-lg-block"
          />
        </div>
      </div>
    );
  }
}

export default App;
