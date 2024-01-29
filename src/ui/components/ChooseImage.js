import React from "react";
import { useDropzone } from "react-dropzone";
import { MDBIcon } from "mdbreact";
import Grid from "@material-ui/core/Grid";

function Dropzone(props) {
  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    multiple: false,
    accept: "image/*",
    onDrop: (files) => {
      props.inputHandler(files[0]);
    },
  });

  return (
    <div className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <Grid
          container
          direction="row"
          justifycontent="space-around"
          alignItems="flex-end"
        >
          <Grid item>
            <img
              src={props.photoUrl}
              style={{
                backgroundColor: "white",
                width: "30%",
                border: "1px solid black",
              }}
              alt="voucher"
            />
          </Grid>
          <Grid item>
            <MDBIcon
              icon="edit"
              size="1x"
              className="blue-text pr-3"
              onClick={open}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Dropzone;
