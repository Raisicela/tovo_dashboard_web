const functions = require('firebase-functions');
const ExcelJS = require('exceljs');
// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

// var serviceAccount = require('./src/inventario-inselmed-firebase-adminsdk-owl0e-1bdb19b572.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://inventario-inselmed.firebaseio.com"
// });
