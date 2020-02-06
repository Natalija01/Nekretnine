import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import jQuery from 'jquery';
import firebase from 'firebase/app';
import Vuelidate from 'vuelidate';
import 'popper.js';
import 'bootstrap';
import './assets/style.scss';
import vuetify from './plugins/vuetify';
require('dotenv').config();
import { i18n } from '@/plugins/i18n';
import { Trans } from './plugins/Translation';
// import VueI18n from 'vue-i18n';

Vue.use(Vuelidate);

window.$ = window.jQuery = jQuery;
Vue.prototype.$i18nRoute = Trans.i18nRoute.bind(Trans);

Vue.config.productionTip = false;

const requireComponent = require.context(
  './components',
  false,
  /Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
  );

  Vue.component(componentName, componentConfig.default || componentConfig);
});

var firebaseConfig = {
  apiKey: process.env.VUE_APP_APIKEY,
  authDomain: process.env.VUE_APP_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_DATABASEURL,
  projectId: process.env.VUE_APP_PROJECTID,
  storageBucket: process.env.VUE_APP_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_MESSENGERSENDERID,
  appId: process.env.VUE_APP_APPID,
  measurementId: process.env.VUE_APP_MEASUREMENTID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase;

new Vue({
  router,
  store,
  firebase,
  i18n,
  render: h => h(App),
  vuetify,

  created() {
    this.$store.commit('setLoading', true);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignIn', user);
        this.$store.commit('setLoading', false);
      } else {
        this.$store.commit('setLoading', false);
      }
    });
  }
}).$mount('#app');
