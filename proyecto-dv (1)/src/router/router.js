// Este archivo va a contener el router y su configuración.

import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Posts from "../pages/Posts.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import MyProfile from "../pages/MyProfile.vue";
import UserProfile from "../pages/UserProfile.vue";
import { subscribeToAuth } from "../services/auth";

// Definimos el array de rutas.
const routes = [
    { path: '/',                        component: Home, },
    { path: '/iniciar-sesion',          component: Login, },
    { path: '/registro',                component: Register, },
    { path: '/posts',                    component: Posts,                meta: { requiresAuth: true } },
    { path: '/perfil',                  component: MyProfile,           meta: { requiresAuth: true } },
    { path: '/usuario/:id',             component: UserProfile,         meta: { requiresAuth: true } },
];

// Creamos el router, configurando las rutas y el sistema de historial que queremos usar.
const router = createRouter({
    routes,
    history: createWebHashHistory(),
});

// Configuramos la restricción por estado de autenticación a nuestro router.
let authUser = {
    id: null,
    email: null,
}

subscribeToAuth(newUserData => authUser = newUserData);

router.beforeEach((to, from) => {
    // console.log('[router] Navegando a la ruta... ', to.path);
    // Para acceder al chat, el usuario debe estar autenticado.
    // TODO: Contemplar otras rutas aparte del chat.
    if(authUser.id === null && to.meta.requiresAuth) {
        return {
            path: '/iniciar-sesion',
        };
    }
});

// Exportamos el router.
export default router;