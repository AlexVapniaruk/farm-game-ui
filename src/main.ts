import { createApp } from 'vue'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import router from "./router.ts";
import './style.css'
import App from './App.vue'
import { createVuetify } from 'vuetify'
import axios from 'axios';
console.log('start')

const vuetify = createVuetify({
    components,
    directives
})

console.log('/env before')
axios.get('/env')
    .then(response => {
        console.log('response /env')
        const envVariables = response.data;
        console.log(envVariables)
        //@ts-ignore
        window.__env__ = envVariables; // Set environment variables on window object
        const app = createApp(App)
        app.use(vuetify);
        app.use(router).mount('#app') // Initialize Vue app after environment variables are set
    })
    .catch(error => {
        console.error('Error fetching environment variables:', error);
        // Handle error if needed
    });
