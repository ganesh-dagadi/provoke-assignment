const admin = require('firebase-admin/app');
const fb = require('firebase-admin')
const serviceAccount = require("../firebaseSecret.json");

// const {
//    FB_API_KEY, AUTH_DOMAIN , PROJECT_ID , STORAGE_BUCKET , MESSAGING_SENDER_ID , APP_ID
// } = process.env

// const firebaseConfig = {
//     apiKey: FB_API_KEY,
//     authDomain: AUTH_DOMAIN,
//     projectId: PROJECT_ID,
//     storageBucket: STORAGE_BUCKET,
//     messagingSenderId: MESSAGING_SENDER_ID,
//     appId: APP_ID
//   };

//   console.log("Ran config")
//   const db =  firebase.initializeApp(firebaseConfig);
admin.initializeApp({
    credential: admin.cert(serviceAccount)
    // databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});
const db = fb.firestore()

module.exports = db