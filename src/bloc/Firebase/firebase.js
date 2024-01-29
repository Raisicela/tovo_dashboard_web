import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCmFlfGFlxrayjB0AtZhploxJry6yMOdBw",
  authDomain: "app-tovo.firebaseapp.com",
  projectId: "app-tovo",
  storageBucket: "app-tovo.appspot.com",
  messagingSenderId: "910522970110",
  appId: "1:910522970110:web:517b9bdf3553bd3f3a5aaf",
  measurementId: "G-7GR85KZ41B",
};

const COLLECTIONS = {
  ADDRESSES: "addresses",
  APPUSERS: "appUsers",
  ADMINUSERS: "adminUsers",
  APPUSERSREDUCED: "appUsersReduced",
  CARS: "cars",
  RATINGS: "ratings",
  SETTINGS: "settings",
  TRIPS: "trips",
  RESERVATIONS: "reservations",
  INTROS: "intros",
  NEWS: "news",
  TRANSACTIONS: "transactions",
  DASHBOARDNOTIFICATIONS: "dashboardNotifications",
  GROUPS: "groups",
  GROUPMEMBERS: "groupMembers",
  DRIVERROUTES: "driverRoutes",
  DRIVERTRIPS: "driverTrips",
  CARPOOLRESERVATIONS: "carpoolReservations",
  MILESTONES: "milestones",
  REWARDS: "rewards",
  REDEEM_REWARDS: "redeemRewards",
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    // this.serverValue = app.database.ServerValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firebase APIs */
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();
  }

  COLLECTIONS = COLLECTIONS;

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: "https://localhost:3000/signin",
    });

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged((authUser) => {
      // console.log("auth user listener", authUser);
      if (authUser) {
        this.user(authUser.uid)
          .get()
          .then((doc) => {
            var dbUser = {};
            if (doc.exists) {
              dbUser = doc.data();
              if (!dbUser.roles) {
                dbUser.roles = {};
              }
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // Timestamp
  timestamp = () => app.firestore.Timestamp;

  // *** User API ***

  user = (uid) => this.db.collection(COLLECTIONS.ADMINUSERS).doc(uid);
  currentUser = () => this.auth.currentUser;

  //AppUsers
  getAllAppUsers() {
    return this.db.collection(COLLECTIONS.APPUSERS);
  }

  getAllVerificationRequests() {
    return this.db
      .collection(COLLECTIONS.APPUSERS)
      .where("personalInformation.status.verificationRequest", "==", true);
  }

  getAppUser(userId) {
    return this.db.collection(COLLECTIONS.APPUSERS).doc(userId);
  }

  getAppUserReduced(userId) {
    return this.db.collection(COLLECTIONS.APPUSERSREDUCED).doc(userId);
  }

  getAllIntros() {
    return this.db.collection(COLLECTIONS.INTROS);
    // .orderBy('order','asc');
  }

  getAllMilestones() {
    return this.db.collection(COLLECTIONS.MILESTONES);
    // .orderBy('order','asc');
  }

  getAllRewards() {
    return this.db.collection(COLLECTIONS.REWARDS);
  }

  saveNewIntro(intro) {
    return this.db
      .collection(COLLECTIONS.INTROS)
      .add({
        ...intro,
        order: parseInt(intro.order),
      })
      .then((documentReference) => {
        documentReference.update({
          introId: documentReference.id,
        });
      });
  }

  saveNewMilestone(milestone) {
    return this.db
      .collection(COLLECTIONS.MILESTONES)
      .add({
        ...milestone,
        order: parseInt(milestone.order),
      })
      .then((documentReference) => {
        documentReference.update({
          milestoneId: documentReference.id,
        });
      });
  }

  saveNewReward(reward) {
    return this.db
      .collection(COLLECTIONS.REWARDS)
      .add({
        ...reward,
        order: parseInt(reward.order),
      })
      .then((documentReference) => {
        documentReference.update({
          rewardId: documentReference.id,
        });
      });
  }

  editIntro(intro) {
    return this.db
      .collection(COLLECTIONS.INTROS)
      .doc(intro.introId)
      .update({
        ...intro,
        order: parseInt(intro.order),
      });
  }

  editMilestone(milestone) {
    return this.db
      .collection(COLLECTIONS.MILESTONES)
      .doc(milestone.milestoneId)
      .update({
        ...milestone,
        order: parseInt(milestone.order),
      });
  }

  editReward(reward) {
    return this.db
      .collection(COLLECTIONS.REWARDS)
      .doc(reward.rewardId)
      .update({
        ...reward,
        order: parseInt(reward.order),
      });
  }

  getAllNews() {
    return this.db.collection(COLLECTIONS.NEWS);
    // .orderBy('order','asc');
  }

  getAllRedeemRewards() {
    return this.db.collection(COLLECTIONS.REDEEM_REWARDS);
    // const redeemRewardsQuery = this.db.collection(COLLECTIONS.REDEEM_REWARDS);
    // const redeemRewards = redeemRewardsQuery.get().then((querySnapshot) => {
    //   const redeemRewards = [];
    //   querySnapshot.forEach((doc) => {
    //     const redeemReward = doc.data();
    //     redeemRewards.push(redeemReward);
    //   });
    //   return redeemRewards;
    // });
    // for (const redeemReward of redeemRewards){
    //   const user = await this.getAppUser(redeemReward.userId).get();
    //   redeemReward.user = user.data();
    // }
    // return redeemRewards;
  }

  saveNewNotice(news) {
    return this.db
      .collection(COLLECTIONS.NEWS)
      .add(news)
      .then((documentReference) => {
        documentReference.update({
          newsId: documentReference.id,
        });
      });
  }

  saveNewTransactions(transactions) {
    return this.db
      .collection(COLLECTIONS.TRANSACTIONS)
      .doc(transactions.transactionId)
      .set(transactions);
  }

  editNews(news) {
    return this.db.collection(COLLECTIONS.NEWS).doc(news.newsId).update(news);
  }

  editTransactions(transactions) {
    return this.db
      .collection(COLLECTIONS.TRANSACTIONS)
      .doc(transactions.transactionsId)
      .update(transactions);
  }

  updatePersonalInformation(userId, newStatus) {
    var verified = false;
    var verificationRequest = false;

    if (newStatus.dataStatus === 3 && newStatus.identificationStatus === 3) {
      verified = true;
    }

    this.db.collection(COLLECTIONS.APPUSERS).doc(userId).update({
      "personalInformation.data.status": newStatus.dataStatus,
      "personalInformation.identification.status":
        newStatus.identificationStatus,
      "personalInformation.status.verified": verified,
      "personalInformation.status.verificationRequest": verificationRequest,
    });
  }

  updateDriverInformation(userId, newStatus) {
    var verified = false;
    var verificationRequest = false;

    if (newStatus.licenceStatus === 3) {
      verified = true;
    }

    this.db.collection(COLLECTIONS.APPUSERS).doc(userId).update({
      "driverInformation.licence.status": newStatus.licenceStatus,
      "driverInformation.status.verified": verified,
      "driverInformation.status.verificationRequest": verificationRequest,
    });
  }

  // enable disable appUser
  updateAppUSerAccountState(userId, status) {
    this.db.collection(COLLECTIONS.APPUSERS).doc(userId).update({
      accountEnabled: status,
    });
  }

  aprovePersonalInformation(userId) {
    this.db.collection(COLLECTIONS.APPUSERS).doc(userId).update({
      "personalInformation.photo.status": 3,
      "personalInformation.data.status": 3,
      "personalInformation.status.verified": true,
      "personalInformation.identification.status": 3,
      "personalInformation.status.verificationRequest": false,
    });
  }

  aproveDriverInformation(userId) {
    this.db.collection(COLLECTIONS.APPUSERS).doc(userId).update({
      "driverInformation.status.verified": true,
      "driverInformation.licence.status": 3,
      "driverInformation.status.verificationRequest": false,
    });
  }

  rejectPersonalInformation(userId) {
    this.db.collection(COLLECTIONS.APPUSERS).doc(userId).update({
      "personalInformation.photo.status": 4,
      "personalInformation.status.verified": false,
      "personalInformation.status.verificationRequest": false,
    });
  }
  rejectDriverInformation(userId) {
    this.db.collection(COLLECTIONS.APPUSERS).doc(userId).update({
      "driverInformation.licence.status": 4,
      "driverInformation.status.verified": false,
      "driverInformation.status.verificationRequest": false,
    });
  }

  aproveCarRegistration(car_id, user_id) {
    this.db.collection(COLLECTIONS.APPUSERS).doc(user_id).update({
      "driverInformation.hasCars": true,
    });
    this.db.collection(COLLECTIONS.CARS).doc(car_id).update({
      "registration.status": 3,
    });
  }

  rejectCarRegistration(car_id) {
    this.db.collection(COLLECTIONS.CARS).doc(car_id).update({
      "registration.status": 4,
    });
  }

  getPassengersAproved() {
    return this.db
      .collection(COLLECTIONS.APPUSERS)
      .where("personalInformation.status.verified", "==", true);
  }

  getDriversAproved() {
    return this.db
      .collection(COLLECTIONS.APPUSERS)
      .where("personalInformation.status.verified", "==", true)
      .where("driverInformation.status.verified", "==", true);
  }

  //CARS

  getAprovedCars() {
    return this.db.collection(COLLECTIONS.CARS);
  }

  getCarsRequests() {
    return this.db
      .collection(COLLECTIONS.CARS)
      .where("registration.status", "==", 2); //solcitud enviada
  }

  getCar(car_Id) {
    return this.db.collection(COLLECTIONS.CARS).doc(car_Id);
  }

  //Configuations
  getConfigurations() {
    return this.db.collection(COLLECTIONS.SETTINGS).doc("bazwWCv63zZhaduuCme2");
  }

  //Configuraciones
  saveSettings(settings) {
    this.db.collection(COLLECTIONS.SETTINGS).doc(settings.id).update(settings);
  }

  //Trips
  getFinishedTrips() {
    return this.db
      .collection(COLLECTIONS.DRIVERTRIPS)
      .where("isActive", "==", false) //viajes finalizados
      .orderBy("finishedAt", "desc");
  }

  getDriverRouteById(id) {
    return this.db.collection(COLLECTIONS.DRIVERROUTES).doc(id);
  }

  getCarpoolReservationById(id) {
    return this.db.collection(COLLECTIONS.CARPOOLRESERVATIONS).doc(id);
  }

  getTrip(tripId) {
    return this.db.collection(COLLECTIONS.TRIPS).doc(tripId);
  }

  getTransactions(resourceId) {
    return this.db
      .collection(COLLECTIONS.TRANSACTIONS)
      .where("resourceId", "==", resourceId);
  }

  getReservationsFromTrip(tripId) {
    return this.db
      .collection(COLLECTIONS.RESERVATIONS)
      .where("tripId", "==", tripId);
  }

  //Reservations
  getApprovedReservations() {
    return this.db
      .collection(COLLECTIONS.RESERVATIONS)
      .where("status", "==", 3)
      .where("isPaid", "==", false);
  }

  updateReservationPayment(reservationId, cardId, isPaid) {
    this.db.collection(COLLECTIONS.RESERVATIONS).doc(reservationId).update({
      cardId: cardId,
      isPaid: isPaid,
    });
  }

  // DASHBOARD NOTIFICATIONS
  getDashboardNotifications() {
    return this.db
      .collection(COLLECTIONS.DASHBOARDNOTIFICATIONS)
      .where("enabled", "==", true)
      .orderBy("createdAt", "desc");
  }

  ignoreNotification(dashboardNotificationId) {
    this.db
      .collection(COLLECTIONS.DASHBOARDNOTIFICATIONS)
      .doc(dashboardNotificationId)
      .update({
        checked: true,
        ignored: true,
        checkedAt: this.timestamp().fromDate(new Date()),
      });
  }

  reviewNotification(dashboardNotificationId) {
    this.db
      .collection(COLLECTIONS.DASHBOARDNOTIFICATIONS)
      .doc(dashboardNotificationId)
      .update({
        checked: true,
        ignored: false,
        checkedAt: this.timestamp().fromDate(new Date()),
      });
  }

  //STORAGE
  uploadFile(path, file) {
    return this.storage.ref(path).put(file);
  }

  deleteFile(UrlFile) {
    return this.storage.ref().child(UrlFile).delete();
  }

  updateTripVoucher(tripId, voucherUrl, voucherPath) {
    this.db.collection(COLLECTIONS.TRIPS).doc(tripId).update({
      "collected.collected": true,
      "collected.voucherUrl": voucherUrl,
      "collected.voucherPath": voucherPath,
    });
  }

  // GROUPS
  getGroups() {
    return this.db.collection(COLLECTIONS.GROUPS);
  }

  getNumberOfMembersOfGroup(groupId) {
    return this.db
      .collection(COLLECTIONS.GROUPMEMBERS)
      .where("groupId", "==", groupId)
      .where("isActive", "==", true);
  }

  // Reviews
  getRatingsOfUser(userId, userType) {
    // userType in true for passenger, in false to driver
    return this.db
      .collection(COLLECTIONS.RATINGS)
      .where("toUserId", "==", userId)
      .where("toUserType", "==", userType ? 2 : 3);
    // .orderBy("createdAt", "desc")
  }
}

export default Firebase;
