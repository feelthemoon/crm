import { createApp } from "vue";
import { VuelidatePlugin } from "@vuelidate/core";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import messagePlugin from "@/utils/message.plugin";
import Loader from "@/components/app/Loader";
import tooltipDirective from "@/directives/tooltip.directive";
import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
firebase.initializeApp({
  apiKey: "AIzaSyAq-4jx3kmmXIriMcW1ldfZ3k2UU1Xg9vc",
  authDomain: "own-crm-c8c7d.firebaseapp.com",
  projectId: "own-crm-c8c7d",
  storageBucket: "own-crm-c8c7d.appspot.com",
  messagingSenderId: "1045123013300",
  appId: "1:1045123013300:web:f4fd0eef24d941314415e1",
  measurementId: "G-THTP822XX0"
});
let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .use(store)
      .use(VuelidatePlugin)
      .use(messagePlugin)
      .use(router)
      .directive("tooltip", tooltipDirective)
      .component("Loader", Loader)
      .mount("#app");
  }
});
