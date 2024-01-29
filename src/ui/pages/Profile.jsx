import React, { useEffect, useState } from "react";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../../bloc/Firebase";
import PhoneNumber from "../components/profile/PhoneNumber";
import Reviews from "../components/profile/Reviews";
import Statistics from "../components/profile/Statistics";
import UserCard from "../components/profile/UserCard";

const Profile = (props) => {
  const [reviews, setReviews] = useState([]);

  const [userName, setUserName] = useState();
  const [userPhotoPath, setUserPhotoPath] = useState();
  const [trips, setTrips] = useState();
  const [rating, setRating] = useState();
  const [co2Saving, setCo2Saving] = useState();
  const [rates, setRates] = useState();
  const [accountEnabled, setAccountEnabled] = useState(true);
  const [userId, setUserId] = useState("");

  //const [loading]

  useEffect(() => {
    //const userId = JSON.parse(localStorage.getItem('authUser')).uid

    const userType = props.match.params.type === "passenger" ? true : false;

    props.firebase
      .getAppUser(props.match.params.userId)
      // .getAppUser('TfSGBBzOZzMdDjegcqjo10ZKs5g1')
      // .getAppUser(userId)
      .onSnapshot(async (querySnapshot) => {
        const getData = async () => {
          return querySnapshot.data();
        };
        getData()
          .then(async (data) => {
            // Load user information
            setUserName(
              data.personalInformation.data.name +
                " " +
                data.personalInformation.data.lastName
            );
            setUserPhotoPath(data.personalInformation.photo.url);
            setRates(
              userType
                ? data.personalInformation.trips.rates
                : data.driverInformation.trips.rates
            );
            setTrips(
              userType
                ? data.personalInformation.trips.total
                : data.driverInformation.trips.total
            );
            setRating(
              userType
                ? data.personalInformation.trips.rating
                : data.driverInformation.trips.rating
            );
            setCo2Saving(
              userType
                ? data.personalInformation.trips.distance * 0.143
                : data.driverInformation.trips.distance * 0.143
            );

            setAccountEnabled(data.accountEnabled ?? true);
            setUserId(data.userId);

            // Get user ratings
            const ratings = await props.firebase
              .getRatingsOfUser(data.userId, userType)
              .get();
            const aux = [];
            await Promise.all(
              ratings.docs.map(async (rating) => {
                const ratingData = rating.data();
                // Get dource of rating
                const sourceRating = await props.firebase
                  .getAppUser(ratingData.fromUserId)
                  .get();
                const sourceRatingData = sourceRating.data();
                aux.push({
                  rating: ratingData.stars, // Don't draw stars if not start in firebase
                  name:
                    sourceRatingData.personalInformation.data.name +
                    " " +
                    sourceRatingData.personalInformation.data.lastName,
                  photo: sourceRatingData.personalInformation.photo.url, // Don't draw photo if not photo url in firebase
                  // ratingCar: ,
                  date: ratingData.createdAt, // Don't draw date if not date in firebase
                  commentary: ratingData.message
                    ? ratingData.message.charAt(0).toUpperCase() +
                      ratingData.message.slice(1)
                    : "", // Don't draw message if not message in firebase
                });
              })
            );
            setReviews(
              aux.sort((x, y) => {
                // Order desc
                if (x.date === undefined || y.date === undefined) return -1;
                return y.date - x.date;
              })
            );
          })
          .catch((error) => {
            console.log("ERROR profile.jsx:", error);
          });
      });
  });

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-5">
            <UserCard photo={userPhotoPath} name={userName} rating={rating} />
          </div>

          <div className="col-6">
            <Statistics rates={rates} trips={trips} co2Saving={co2Saving} />
          </div>

          <div className="col-1">
            <button
              style={{
                backgroundColor: accountEnabled ? "red" : "blue",
                color: "white",
              }}
              onClick={() => {
                props.firebase.updateAppUSerAccountState(
                  userId,
                  !accountEnabled
                );
              }}
            >
              {accountEnabled ? "Desactivar el usuario" : "Activar el usuario"}
            </button>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <PhoneNumber phone="0960640873" verified={true} />
          </div>
        </div>
      </div>

      <div
        className="container mt-5 py-3"
        style={{
          marginBottom: "120px",
          borderRadius: "20px",
          border: "1px solid rgb(210, 210, 210)",
        }}
      >
        <div className="row">
          <div className="col text-center">
            <span className="h5">Valoraciones</span>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col text-center px-5">
            {reviews.length !== 0 ? (
              reviews.map((review, index) => {
                return (
                  <Reviews
                    key={index}
                    photo={review.photo}
                    name={review.name}
                    rating={review.rating}
                    // car={review.car}
                    date={review.date}
                    commentary={review.commentary}
                  />
                );
              })
            ) : (
              <span>Aún no tenemos reviews para ti</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default compose(withRouter, withFirebase)(Profile);
