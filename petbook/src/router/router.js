import Home from "../pages/Home.vue";
import Chat from "../pages/Chat.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import { createRouter, createWebHashHistory } from 'vue-router';
import MyProfile from "../pages/MyProfile.vue";
import UserProfile from "../pages/UserProfile.vue";
import { suscribeToAuth } from "../services/auth";

const routes = [
    { path: '/',                    component: Home, },
    { path: '/chat',                component: Chat,},
    { path: '/iniciar-sesion',      component: Login,},
    { path: '/registro',            component: Register,},
    { path: '/perfil',              component: MyProfile,},
    { path: '/usuario/:id',         component: UserProfile,},
]

const router = createRouter({
    routes,
    history: createWebHashHistory(),
})

let authUser = {
    id: null,
    email: null,
}

suscribeToAuth(newUserData => authUser = newUserData)

router.beforeEach((to, from) => {
    if(authUser.id === null && to.path == '/chat') {
        return {
            path: '/iniciar-sesion',
        }
    }
})

export default router