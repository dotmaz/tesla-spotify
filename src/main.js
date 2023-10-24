import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowUp, faArrowRightFromBracket, faCompactDisc, faList } from '@fortawesome/free-solid-svg-icons'

library.add(faArrowUp, faArrowRightFromBracket, faCompactDisc, faList)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.mount('#app')
