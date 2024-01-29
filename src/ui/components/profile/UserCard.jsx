import React from "react";
import RatingStarts from "./RatingStarts";

const UserCard = (props) => {
  // const handleImgError = () => {
  //   console.log("ENTRA");
  // };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {/* Photo */}
          <div className="col">
            <div
              className="rounded-circle overflow-hidden text-center mx-auto"
              style={{
                width: "150px",
                height: "150px",
              }}
            >
              <img
                src={props.photo}
                alt="User"
                width="100%"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/defaultPhoto.jpeg";
                }}
              />
            </div>
          </div>

          {/* Name and starts */}
          <div className="col">
            {/* Name */}
            <div className="row">
              <div className="col pt-5">
                <span
                  style={{
                    fontSize: "25px",
                  }}
                >
                  {props.name}
                </span>
              </div>
            </div>
            {/* Rating */}
            {/* { console.log('rating:', props.rating, typeof props.rating) } */}
            <div className="row">
              <div className="col">
                <RatingStarts rating={props.rating} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
