// import { createWebHistory, createRouter } from 'vue-router'
import { createWebHashHistory, createRouter } from 'vue-router'

const mainpage = () => import('@/views/main.vue'); //Lazy load
const COLOR_LIST = () => import('@/views/content1.vue'); //Lazy load
const pickpage = () => import('@/views/pick.vue');
const loginpage = () => import('@/views/login.vue');

const routes = [
    {
        path: '/',
        name: 'main',
        component: mainpage,
    },

    {
        path: '/ColorList', 
        name: 'color list', 
        component: COLOR_LIST, 
    },

    {
        path : '/pick',
        name : 'pick',
        component : pickpage,
    },
    {
        path : '/login',
        name : 'login',
        component : loginpage
    }

]

const router = createRouter({
    // history: createWebHistory(), aaaaa
    history: createWebHashHistory(),
    routes
})

export default router