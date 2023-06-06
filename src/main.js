import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'animate.css'

/* import the fontawesome core */
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/pro-solid-svg-icons';

import {far} from '@fortawesome/pro-regular-svg-icons';

import {fab} from '@fortawesome/free-brands-svg-icons';

import {fal} from '@fortawesome/pro-light-svg-icons';
import {fat} from '@fortawesome/pro-thin-svg-icons';
import {fad} from '@fortawesome/pro-duotone-svg-icons';
import {fass} from '@fortawesome/sharp-solid-svg-icons';

/* add icons to the library */
library.add(fas, far, fab, fal, fat, fad, fass)

import 'gitart-vue-dialog/dist/style.css'
import { GDialog } from 'gitart-vue-dialog'
import { plugin as dialogPlugin } from 'gitart-vue-dialog'

import { initializeApp } from "firebase/app";
import router from "./router";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later,© measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCjX0BXq8RV8jCCA6O3ROT9noPE7DJ_V7A",
    authDomain: "moto-website-50171.firebaseapp.com",
    projectId: "moto-website-50171",
    storageBucket: "moto-website-50171.appspot.com",
    messagingSenderId: "893206587571",
    appId: "1:893206587571:web:2d933a700f75e595d2a8c6",
    measurementId: "G-Z7SSN33J6B",
    databaseURL: "https://moto-website-50171-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
initializeApp(firebaseConfig);

import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const options = {
    // You can set your default options here
};

createApp(App)
    .use(Toast, options)
    .use(dialogPlugin)
    .component('GDialog', GDialog)
    .use(router)
    .mount('#app')
