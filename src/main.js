import { createApp } from 'vue'
import './style.css'
import App from './App.vue'


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
import createRouter from './router'

createApp(App)
    .use(createRouter())
    .mount('#app')