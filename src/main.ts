import { createApp } from 'vue'
import 'vuetify/dist/vuetify.min.css' // Ensure you are importing Vuetify CSS
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import router from "./router.ts";
import './style.css'
import App from './App.vue'
import { createVuetify } from 'vuetify'

const app = createApp(App)

const vuetify = createVuetify({
    components,
    directives
})

app.use(vuetify)

import axios from 'axios';

axios.get('/env')
    .then(response => {
        const envVariables = response.data;
        //@ts-ignore
        window.__env__ = envVariables; // Set environment variables on window object
        app.use(router).mount('#app') // Initialize Vue app after environment variables are set
    })
    .catch(error => {
        console.error('Error fetching environment variables:', error);
        // Handle error if needed
    });
