import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faArrowUp,
  faArrowRight,
  faArrowRightFromBracket,
  faCompactDisc,
  faList
} from '@fortawesome/free-solid-svg-icons'

library.add(faArrowUp, faArrowRight, faArrowRightFromBracket, faCompactDisc, faList)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.mount('#app')
