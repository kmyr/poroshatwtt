import Vue from "vue";
import App from "./App.vue";
import vueResource from "vue-resource";
import $ from "jquery";
import router from "./router";
import vueRouter from 'vue-router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import cors from "cors"


// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false;

Vue.use(vueRouter)
Vue.use(cors)

var moment = require('jalali-moment');
var nowDate = moment().locale('fa').format('YYYY/M/D')

new Vue.use($);
Vue.use(vueResource);
Vue.http.options.root = "https://poroshatwtt.firebaseio.com";

Vue.mixin({
    data() {
        return {
            currentDate: nowDate
        }
    }
})
new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");