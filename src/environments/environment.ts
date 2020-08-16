// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyC2AfGPNVZUaZV5X14si9SqxJUQF38jioc",
    authDomain: "stayathome-8bcd5.firebaseapp.com",
    databaseURL: "https://stayathome-8bcd5.firebaseio.com",
    projectId: "stayathome-8bcd5",
    storageBucket: "stayathome-8bcd5.appspot.com",
    messagingSenderId: "38870066313",
    appId: "1:38870066313:web:bcea55971f8f6192ca9258",
    measurementId: "G-5X7K1N17YR"
  },
  maps_API: 'AIzaSyDby5HLuBLp25A_XWBYVZlJfo8FXS9ZWuE'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
