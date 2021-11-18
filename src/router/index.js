// import { createWebHistory, createRouter } from 'vue-router'
import { createWebHashHistory, createRouter } from 'vue-router'
// import main from '@/views/main.vue'
// import content1 from '@/views/content1.vue'

const mainpage = () => import('@/views/main.vue'); //Lazy load
const COLOR_LIST = () => import('@/views/content1.vue'); //Lazy load
const pickpage = () => import('@/views/pick.vue');
const loginpage = () => import('@/components/login.vue');

const routes = [
    {
        path: '/',
        name: 'main',
        component: mainpage,
    },

    {
        path: '/ColorList', 
        name: 'color_list', 
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
    // history: createWebHistory(),
    history: createWebHashHistory(),
    routes
})

export default router