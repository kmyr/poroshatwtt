import Vue from "vue";
import Router from "vue-router";
import home from "./view/home"

Vue.use(Router);

export default new Router({
    mode: "history",
    linkExactActiveClass: "active",
    routes: [
        {
            path: '/',
            component: home
        }
    ],
    scrollBehavior: (to) => {
        if (to.hash) {
            return { selector: to.hash };
        } else {
            return { x: 0, y: 0 };
        }
    },
});