import React from "react";
import { MDBFooter } from "mdbreact";

const Copyrights = (props) => {
  const date = new Date().getFullYear();
  return (
    <MDBFooter
      className={props.className}
      style={{ ...props.style, zIndex: 2 }}
      // color="blue"
      // className="page-footer font-small pt-4 mt-4"
    >
      {/* <p>F&R Solutions</p> */}
      <p className="footer-copyright mb-0 py-3 text-center">
        &copy; {date} Copyright:{" "}
        <a href="https://tovo.com.ec/"> Tovo. </a>
        Creado por F&R Solutions.
      </p>
    </MDBFooter>
  );
};
export default Copyrights;
