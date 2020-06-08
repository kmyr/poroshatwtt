import Vue from "vue";
import Router from "vue-router";
import home from "./view/home"
import editTask from "@/components/editTask"
// import Dashboard from "@/components/Dashboard"
import newTask from "@/components/newTask"
import viewTask from "@/components/viewTask"


Vue.use(Router);

export default new Router({
    mode: "history",
    linkExactActiveClass: "active",
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: home
        },
        {
            path: '/edit/:taskTitle',
            name: 'edit_task',
            component: editTask
        },
        {
            path: '/new',
            name: 'new_task',
            component: newTask
        },

        {
            path: '/:taskTitle',
            name: 'view_task',
            component: viewTask
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