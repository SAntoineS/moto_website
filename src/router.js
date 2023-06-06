import {createRouter, createWebHistory} from 'vue-router/dist/vue-router.esm-bundler'
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useToast} from "vue-toastification";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: 'welcome'
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('./components/Home/Home.vue'),
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: '/maintenance/:motorcycleId',
            name: 'maintenance',
            component: () => import('./components/Maintenance/MaintenancesView/Maintenance.vue'),
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: '/maintenance',
            name: 'motorcycles',
            component: () => import('./components/Maintenance/MotorcyclesView/Motorcycles.vue'),
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: '/gear',
            name: 'gear',
            component: () => import('./components/Gear/Gear.vue'),
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: '/rides',
            name: 'rides',
            component: () => import('./components/Rides/rides.vue'),
            meta: {
                requiresAuth: true,
            },
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
});

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            },
            reject
        );
    });
};

router.beforeEach(async (to, from, next) => {
    if ((to.path === '/login' || to.path === '/register') && await getCurrentUser()) {
        next('/home')
    }
    if (to.path === '/welcome' && await getCurrentUser()) {
        next('/home')
    }
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (await getCurrentUser()) {
            next();
        } else {
            //alert("You don't have access !");
            console.log(router);
            const toast = useToast();
            toast.warning("You need to be logged before access !");
            next('/welcome');
        }
    } else {
        next();
    }
});

export default router;
