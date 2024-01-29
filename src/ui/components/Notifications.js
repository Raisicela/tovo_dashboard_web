import React, { Fragment, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import moment from "moment";

const Notifications = (props) => {
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

  const notificationsRef = useRef();

  const handleClickOutside = (event) => {
    if (
      ReactDOM.findDOMNode(notificationsRef.current) &&
      !ReactDOM.findDOMNode(notificationsRef.current).contains(event.target)
    ) {
      props.closeNotifications();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return (
    <>
      <div
        className="position-absolute bg-white"
        style={{
          right: "118px",
          top: "38px",
          width: "400px",
          maxHeight: "300px",
          borderRadius: "5px",
          boxShadow:
            "rgba(0, 0, 0, 0.3) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
        }}
        ref={notificationsRef}
      >
        <div
          className="position-relative container py-3 scroll-color"
          style={{
            width: "100%",
            maxHeight: "300px",
            overflowY: "auto",
          }}
        >
          {props.data.map((notification, index) => {
            return (
              <Fragment key={index}>
                <div className="row w-100 px-0">
                  {/* Point checked */}
                  <div className="col-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="6"
                      className="bi bi-circle-fill"
                      viewBox="0 0 16 16"
                      fill={notification.checked ? "white" : "red"}
                    >
                      <circle cx="8" cy="8" r="8" />
                    </svg>
                  </div>

                  {/* Notification message */}
                  <div className="col-11 pl-0">
                    <span>{notification.message}</span>
                  </div>
                </div>

                <div className="row w-100 pb-3 px-0">
                  {/* Time */}
                  <div className="col-5 offset-1 text-left px-0">
                    <span style={{ fontSize: "12px" }}>
                      Hace {getRelativeTime(notification.createdAt)}
                    </span>
                  </div>

                  <div className="col-6 d-flex justify-content-end pr-0">
                    <div
                      onClick={() =>
                        props.clickOnReview(
                          notification.dashboardNotificationId,
                          notification.entityId,
                          notification.type
                        )
                      }
                    >
                      <span className="revisar" style={{ fontSize: "12px" }}>
                        Revisar
                      </span>
                    </div>
                    <div>
                      <span
                        className="ignorar"
                        style={{
                          marginLeft: "10px",
                          fontSize: "12px",
                        }}
                        onClick={() =>
                          props.clickOnIgnore(
                            notification.dashboardNotificationId
                          )
                        }
                      >
                        Ignorar
                      </span>
                    </div>
                  </div>
                </div>
              </Fragment>
            );
          })}
        </div>
        <style>
          {`
            .revisar:hover{
              cursor: pointer;
              color: green;
            }
            .ignorar:hover{
              cursor: pointer;
              color: rgb(36, 15, 68);
            }
            .scroll-color::-webkit-scrollbar {
              width: 0.2rem;
            }
            .scroll-color::-webkit-scrollbar-track-piece {
              background-color: transparent; /* #CCC */
              border-radius: 1.5rem;
            }
            .scroll-color::-webkit-scrollbar-thumb {
              background-color: gray;
              border-radius: 1.5rem;
              height: 20px;
              min-height: 20px;
            }
          `}
        </style>
      </div>
    </>
  );
};

export default Notifications;
