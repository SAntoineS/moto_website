import {createRouter, createWebHistory} from 'vue-router/dist/vue-router.esm-bundler'

export default () => createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: 'welcome'
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
            path: "/:pathMatch(.*)*",
            name: '404NotFound',
            component: () => import('./components/404.vue')
        },
        {
            path: "/:pathMatch(.*)",
            name: '404BadNotFound',
            component: () => import('./components/404.vue')
        }

    ]
})
