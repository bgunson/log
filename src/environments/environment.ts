// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import firebase from "firebase";

export const environment = {
  production: false,
  firebase: {
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional{
    apiKey: "AIzaSyDGJa5wGLT_6SvNBVfkN8jdu9b-Ou1i3I8",
    authDomain: "log-app-80fd0.firebaseapp.com",
    projectId: "log-app-80fd0",
    storageBucket: "log-app-80fd0.appspot.com",
    messagingSenderId: "98872430236",
    appId: "1:98872430236:web:5b117999a14eaf77a52759",
    measurementId: "G-ZHWVJNH1BP"
  }
  
};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
