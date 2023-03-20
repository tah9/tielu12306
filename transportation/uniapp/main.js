import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'
const BASE_URL = 'http://10.0.2.2:9003'

Vue.prototype.$BASE_URL = BASE_URL

const app = new Vue({
    ...App
})
app.$mount()
