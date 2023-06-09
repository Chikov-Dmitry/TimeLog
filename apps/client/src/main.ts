import './assets/main.scss'
import 'primevue/resources/primevue.min.css'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'

import App from './App.vue'
import router from './router'

import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'
import Tooltip from 'primevue/tooltip'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ProgressBar from 'primevue/progressbar'
import Checkbox from 'primevue/checkbox'
import ProgressSpinner from 'primevue/progressspinner'
import Chart from 'primevue/chart'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.use(ToastService)

app.directive('tooltip', Tooltip)

app.component('pInputText', InputText)
app.component('pPassword', Password)
app.component('pButton', Button)
app.component('pToast', Toast)
app.component('pDataTable', DataTable)
app.component('pColumn', Column)
app.component('pProgressBar', ProgressBar)
app.component('pCheckbox', Checkbox)
app.component('pProgressSpinner', ProgressSpinner)
app.component('pChart', Chart)

app.mount('#app')
