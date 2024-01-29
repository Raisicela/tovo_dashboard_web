import React from "react";
import moment from "moment";
import RatingStarts from "./RatingStarts";

const Reviews = (props) => {
  const getRelativeTime = (date) => {
    const now = moment();
    // const before = moment(date)//, 'YYYY-MM-DDThh:mm:ssZ') // 1 de mayo de 2022, 10:00:00 UTC-5
    const before = moment(date.toDate());
    const relativeTime = moment.duration(now.diff(before));
    // Minutes
    if (relativeTime.asMinutes() < 60)
      return `${Math.floor(relativeTime.asMinutes())} ${
        Math.floor(relativeTime.asMinutes()) === 1 ? "minuto" : "minutos"
      }`;
    // Hours
    if (relativeTime.asHours() < 24)
      return `${Math.floor(relativeTime.asHours())} ${
        Math.floor(relativeTime.asHours()) === 1 ? "hora" : "horas"
      }`;
    // Days
    if (relativeTime.asDays() < 30)
      return `${Math.floor(relativeTime.asDays())} ${
        Math.floor(relativeTime.asDays()) === 1 ? "día" : "días"
      }`;
    // Months
    if (relativeTime.asMonths() < 12)
      return `${Math.floor(relativeTime.asMonths())} ${
        Math.floor(relativeTime.asMonths()) === 1 ? "mes" : "meses"
      }`;
    // Years
    return `${Math.floor(relativeTime.asYears())} ${
      Math.floor(relativeTime.asYears()) === 1 ? "año" : "años"
    }`;
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row mb-3 pb-3 border-bottom">
          <div className="col d-flex">
            {/* Photo */}
            <div
              className="rounded-circle overflow-hidden"
              style={{
                width: "50px",
                height: "50px",
              }}
            >
              <img
                src={props.photo || "/logo.png"}
                alt="profile"
                width="100%"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/logo.png";
                }}
              />
            </div>

            <div className="container-fluid">
              <div className="row">
                {/* Name car and date */}
                <div className="col-12">
                  <div className="pl-3 w-100 text-left">
                    <span
                      style={{
                        fontSize: "12px",
                      }}
                    >
                      {props.name}
                    </span>
                    <span
                      style={{
                        fontSize: "10px",
                        marginLeft: "10px",
                      }}
                    >
                      {props.date && "Hace " + getRelativeTime(props.date)}
                    </span>
                  </div>
                </div>

                {/* Rating */}
                <div className="col-12">
                  <div className="pl-3 w-100 text-left">
                    <RatingStarts rating={props.rating} size={12} />
                  </div>
                </div>

                {/* Commentary */}
                <div className="col mt-1">
                  <div className="pl-3 w-100 text-left">
                    <span
                      style={{
                        fontSize: "12px",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {props.commentary}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reviews;
