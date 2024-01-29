import React, { useEffect, useState } from "react";

const RatingStarts = (props) => {
  // const [completeStarts, setCompleteStarts] = useState(0)
  // const [halfStarts, setHalfStarts] = useState(false)
  const [startsComponent, setStartsComponent] = useState();

  useEffect(() => {
    //let rating = 0
    //if (props.rating) rating = props.rating

    const completeStarts = Math.floor(props.rating);

    const auxStartsComponent = [];
    for (let index = 0; index < completeStarts; index++) {
      auxStartsComponent.push(
        <i
          key={index}
          className="fas fa-star mr-1"
          style={{
            color: "rgb(30, 193, 84)",
            fontSize: props.size ? `${props.size}px` : "18px",
          }}
        />
      );
    }

    if (props.rating > completeStarts) {
      auxStartsComponent.push(
        <i
          key={completeStarts}
          className="fas fa-star-half-alt"
          style={{
            color: "rgb(30, 193, 84)",
            fontSize: props.size ? `${props.size}px` : "18px",
          }}
        />
      );

      for (let index = completeStarts + 1; index < 5; index++) {
        auxStartsComponent.push(
          <i
            key={index}
            className="far fa-star ml-1"
            style={{
              color: "gray",
              fontSize: props.size ? `${props.size}px` : "18px",
            }}
          />
        );
      }
    } else {
      for (let index = completeStarts; index < 5; index++) {
        auxStartsComponent.push(
          <i
            key={index}
            className={`far fa-star ${index !== completeStarts && "ml-1"}`}
            style={{
              color: "gray",
              fontSize: props.size ? `${props.size}px` : "18px",
            }}
          />
        );
      }
    }

    setStartsComponent(auxStartsComponent);
    //});
  }, [props.rating, props.size]);

  return (
    <>
      <div className="d-flex">{startsComponent}</div>
    </>
  );
};

export default RatingStarts;
