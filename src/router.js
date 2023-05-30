import { createRouter, createWebHistory } from 'vue-router/dist/vue-router.esm-bundler'

export default () => createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: 'home'
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('./components/Home.vue')
        },
        {
            path: '/welcome',
            name: 'welcome',
            component: () => import('./components/Welcome.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: ()=> import('./components/Register.vue')
        },

    ]
})