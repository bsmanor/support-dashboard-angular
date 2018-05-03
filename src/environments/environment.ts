// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyDzyn6_ycdrEtlE39QGXRVG35qz1BLgvgg",
    authDomain: "hasoffers-support-dashboard.firebaseapp.com",
    databaseURL: "https://hasoffers-support-dashboard.firebaseio.com",
    projectId: "hasoffers-support-dashboard",
    storageBucket: "hasoffers-support-dashboard.appspot.com",
    messagingSenderId: "917546424585"
  }
};
